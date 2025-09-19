package com.privatechef.collaboration;

import com.privatechef.collaboration.model.*;
import com.privatechef.collaboration.repository.CollaborationsRepository;
import com.privatechef.collaboration.repository.CollaborationsUserRepository;
import com.privatechef.exception.CollaborationsModelNotFound;
import com.privatechef.exception.CollaborationsNotAuthorised;
import com.privatechef.exception.CollaboratorAlreadyExists;
import com.privatechef.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CollaborationService {

    private final CollaborationsUserRepository collaborationsUserRepository;
    private final CollaborationsRepository collaborationsRepository;
    private final EmailService emailService;

    private CollaborationsUserModel getOrCreateCollaborationUser(String userId) {
        return collaborationsUserRepository.findByUserId(userId).orElseGet(() ->
                collaborationsUserRepository.save(
                        CollaborationsUserModel.builder().userId(userId).build()
                )
        );
    }

    public CollaborationsUserDto getCollaborationUser(String userId) {
        CollaborationsUserModel collaborationsUser = getOrCreateCollaborationUser(userId);

        // Fetch invited collaborations
        List<CollaborationsModel> invited = collaborationsUser.getInvitedCollaborations().stream()
                .map(collaborationsRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        // Fetch received collaborations
        List<CollaborationsModel> received = collaborationsUser.getReceivedCollaborations().stream()
                .map(collaborationsRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        return CollaborationsUserDto.builder()
                .id(collaborationsUser.getId())
                .userId(collaborationsUser.getUserId())
                .invitedCollaborations(invited)
                .receivedCollaborations(received)
                .build();
    }


    public CollaborationsModel inviteUserByEmail(String inviterUserId, String inviteeEmail) {
        CollaborationsUserModel inviterCollaborationsUser = getOrCreateCollaborationUser(inviterUserId);

        // check if invite already exists for this email
        boolean alreadyExists = inviterCollaborationsUser.getInvitedCollaborations().stream()
                .map(collaborationsRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .anyMatch(c -> c.getInviteeEmail().equalsIgnoreCase(inviteeEmail));
        if (alreadyExists) {
            throw new CollaboratorAlreadyExists(inviteeEmail);
        }

        // create collaboration
        String token = UUID.randomUUID().toString();
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .inviterId(inviterUserId)
                .inviteeEmail(inviteeEmail)
                .status(CollaborationsStatus.PENDING)
                .token(token)
                .createdAt(LocalDateTime.now())
                .build();

        collaboration = collaborationsRepository.save(collaboration);

        // add id to invitedCollaborations
        inviterCollaborationsUser.getInvitedCollaborations().add(collaboration.getId());
        collaborationsUserRepository.save(inviterCollaborationsUser);

        // sending invitation email
        emailService.sendCollaborationInvitationEmail(inviteeEmail, inviteeEmail, token);
        return collaboration;
    }

    public void addCollaborationIdToCollaborationsUserReceivedByToken(String userId, String token) {
        CollaborationsModel collaboration = collaborationsRepository.findByToken(token)
                .orElseThrow(() -> new CollaborationsModelNotFound("token=" + token));

        CollaborationsUserModel user = getOrCreateCollaborationUser(userId);

        if (userId.equals(collaboration.getInviterId())) {
            throw new CollaborationsNotAuthorised(userId);
        }

        if (!user.getReceivedCollaborations().contains(collaboration.getId())) {
            user.getReceivedCollaborations().add(collaboration.getId());
            collaborationsUserRepository.save(user);
        }
    }


    public CollaborationsModel updateCollaborationStatus(String currentUserId, String token, CollaborationsStatus newStatus) {
        CollaborationsModel collaboration = collaborationsRepository.findByToken(token)
                .orElseThrow(() -> new CollaborationsModelNotFound("token=" + token));

        if (collaboration.getInviteeId() == null) {
            collaboration.setInviteeId(currentUserId);
        }
        if (!collaboration.getInviteeId().equals(currentUserId)) {
            throw new IllegalStateException("This invitation is not addressed to the current user.");
        }

        // Update status
        if (newStatus != CollaborationsStatus.ACCEPTED && newStatus != CollaborationsStatus.DECLINED) {
            throw new IllegalArgumentException("Allowed statuses for invitee are ACCEPTED or DECLINED.");
        }
        collaboration.setStatus(newStatus);
        collaboration.setUpdatedAt(LocalDateTime.now());
        collaborationsRepository.save(collaboration);

        // Ensure invitee has linked the receivedCollaborations
        CollaborationsUserModel inviteeCollaborationsUser = getOrCreateCollaborationUser(currentUserId);
        if (!inviteeCollaborationsUser.getReceivedCollaborations().contains(collaboration.getId())) {
            inviteeCollaborationsUser.getReceivedCollaborations().add(collaboration.getId());
            collaborationsUserRepository.save(inviteeCollaborationsUser);
        }

        return collaboration;
    }


    // inviter removes their invite
    public void removeInvitationAsInviter(String inviterUserId, String collaborationId) {
        CollaborationsModel collaboration = collaborationsRepository.findById(collaborationId)
                .orElseThrow(() -> new CollaborationsModelNotFound(collaborationId));

        if (!inviterUserId.equals(collaboration.getInviterId())) {
            throw new IllegalStateException("Only the inviter can remove this invitation.");
        }

        // Remove id from inviter
        CollaborationsUserModel inviterCollaborationsUser = getOrCreateCollaborationUser(inviterUserId);
        inviterCollaborationsUser.getInvitedCollaborations().remove(collaborationId);
        collaborationsUserRepository.save(inviterCollaborationsUser);

        // Remove id from invitee
        if (collaboration.getInviteeId() != null) {
            CollaborationsUserModel inviteeCollaborationsUser = collaborationsUserRepository.findByUserId(collaboration.getInviteeId())
                    .orElseThrow(() -> new CollaborationsModelNotFound("inviteeId: " + collaboration.getInviteeId()));
            inviteeCollaborationsUser.getReceivedCollaborations().remove(collaborationId);
            collaborationsUserRepository.save(inviteeCollaborationsUser);
        }

        collaborationsRepository.deleteById(collaborationId);
    }

    // invitee removes their collaboration
    public void removeCollaborationAsInvitee(String inviteeUserId, String collaborationId) {
        CollaborationsModel collaboration = collaborationsRepository.findById(collaborationId)
                .orElseThrow(() -> new CollaborationsModelNotFound(collaborationId));

        // Bind if not yet bound (rare case: invitee uses token first then calls remove by id)
        if (collaboration.getInviteeId() == null) collaboration.setInviteeId(inviteeUserId);

        if (!inviteeUserId.equals(collaboration.getInviteeId())) {
            throw new IllegalStateException("Only the invitee can remove this collaboration.");
        }

        // Remove from invitee
        CollaborationsUserModel inviteeCollaborationUser = getOrCreateCollaborationUser(inviteeUserId);
        inviteeCollaborationUser.getReceivedCollaborations().remove(collaborationId);
        collaborationsUserRepository.save(inviteeCollaborationUser);

        // Remove from inviter
        CollaborationsUserModel inviterCollaborationUser = collaborationsUserRepository.findByUserId(collaboration.getInviterId())
                .orElseThrow(() -> new CollaborationsModelNotFound("inviterId: " + collaboration.getInviterId()));
        inviterCollaborationUser.getInvitedCollaborations().remove(collaborationId);
        collaborationsUserRepository.save(inviterCollaborationUser);

        collaborationsRepository.deleteById(collaborationId);
    }
}
