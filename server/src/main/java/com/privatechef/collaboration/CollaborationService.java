package com.privatechef.collaboration;

import com.privatechef.collaboration.model.CollaborationModel;
import com.privatechef.collaboration.model.CollaborationUpdateStatusRequestDto;
import com.privatechef.collaboration.model.CollaboratorModel;
import com.privatechef.collaboration.repository.CollaborationRepository;
import com.privatechef.exception.CollaborationsModelNotFound;
import com.privatechef.exception.CollaboratorAlreadyExists;
import com.privatechef.exception.CollaboratorNotFound;
import com.privatechef.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CollaborationService {

    private final CollaborationRepository collaborationRepository;
    private final EmailService emailService;

    public CollaborationModel getCollaboration(String userId) {
        return collaborationRepository.findByUserId(userId).orElseGet(() -> {
            CollaborationModel collaborationModel = new CollaborationModel();
            collaborationModel.setUserId(userId);
            return collaborationRepository.save(collaborationModel);
        });
    }

    public CollaborationModel addCollaborator(String userId, String email) {
        CollaborationModel collaborationModel = collaborationRepository.findByUserId(userId).orElseThrow(() -> new CollaborationsModelNotFound(userId));
        if (collaborationModel.getCollaborations().stream().anyMatch(col -> col.getCollaboratorEmail().equals(email))) {
            throw new CollaboratorAlreadyExists(email);
        }

        CollaboratorModel collaborator = new CollaboratorModel();
        collaborator.setCollaboratorEmail(email);

        collaborationModel.getCollaborations().add(collaborator);
        collaborationRepository.save(collaborationModel);

        // sending invitation email
        emailService.sendCollaborationInvitationEmail(email, email, userId);
        return collaborationModel;
    }

    public CollaboratorModel updateCollaboratorStatus(String userId, CollaborationUpdateStatusRequestDto requestDto) {
        CollaborationModel collaborationModel = collaborationRepository.findByUserId(requestDto.getInvitorUserId()).orElseThrow(() -> new CollaborationsModelNotFound(requestDto.getInvitorUserId()));
        CollaboratorModel collaborator = collaborationModel.getCollaborations().stream()
                .filter(col -> col.getCollaboratorEmail().equals(requestDto.getCollaboratorEmail()))
                .findFirst()
                .orElseThrow(() -> new CollaboratorNotFound(requestDto.getCollaboratorEmail()));

        collaborator.setCollaboratorStatus(requestDto.getCollaboratorStatus());
        collaborator.setCollaboratorId(userId);
        collaborator.setUpdatedAt(LocalDateTime.now());

        collaborationRepository.save(collaborationModel);
        return collaborator;
    }
}
