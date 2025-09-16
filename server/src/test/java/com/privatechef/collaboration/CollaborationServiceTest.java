package com.privatechef.collaboration;

import com.privatechef.collaboration.model.CollaborationsModel;
import com.privatechef.collaboration.model.CollaborationsStatus;
import com.privatechef.collaboration.model.CollaborationsUserDto;
import com.privatechef.collaboration.model.CollaborationsUserModel;
import com.privatechef.collaboration.repository.CollaborationsRepository;
import com.privatechef.collaboration.repository.CollaborationsUserRepository;
import com.privatechef.exception.CollaborationsNotAuthorised;
import com.privatechef.exception.CollaboratorAlreadyExists;
import com.privatechef.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CollaborationServiceTest {

    @Mock
    private CollaborationsUserRepository collaborationsUserRepository;
    @Mock
    private CollaborationsRepository collaborationsRepository;
    @Mock
    private EmailService emailService;

    @InjectMocks
    private CollaborationService collaborationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        collaborationService = new CollaborationService(collaborationsUserRepository, collaborationsRepository, emailService);
    }

    @Test
    void collaborationService_getCollaborationUser_WhenNotFound_ShouldCreateDefault() {
        String userId = "user1";
        CollaborationsUserModel userModel = CollaborationsUserModel.builder().userId(userId)
                .invitedCollaborations(new ArrayList<>())
                .receivedCollaborations(new ArrayList<>())
                .build();

        when(collaborationsUserRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(collaborationsUserRepository.save(any())).thenReturn(userModel);

        CollaborationsUserDto result = collaborationService.getCollaborationUser(userId);

        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        assertTrue(result.getInvitedCollaborations().isEmpty());
        assertTrue(result.getReceivedCollaborations().isEmpty());
        verify(collaborationsUserRepository).save(any());
    }

    @Test
    void collaborationService_getCollaborationUser_WhenFound_ShouldReturnExisting() {
        String userId = "user2";
        String invitedId = "inv1";
        String receivedId = "rec1";
        CollaborationsUserModel userModel = CollaborationsUserModel.builder()
                .userId(userId)
                .invitedCollaborations(new ArrayList<>(List.of(invitedId)))
                .receivedCollaborations(new ArrayList<>(List.of(receivedId)))
                .build();
        CollaborationsModel invitedModel = CollaborationsModel.builder().id(invitedId).build();
        CollaborationsModel receivedModel = CollaborationsModel.builder().id(receivedId).build();

        when(collaborationsUserRepository.findByUserId(userId)).thenReturn(Optional.of(userModel));
        when(collaborationsRepository.findById(invitedId)).thenReturn(Optional.of(invitedModel));
        when(collaborationsRepository.findById(receivedId)).thenReturn(Optional.of(receivedModel));

        CollaborationsUserDto result = collaborationService.getCollaborationUser(userId);

        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        assertEquals(1, result.getInvitedCollaborations().size());
        assertEquals(1, result.getReceivedCollaborations().size());
        assertEquals(invitedId, result.getInvitedCollaborations().getFirst().getId());
        assertEquals(receivedId, result.getReceivedCollaborations().getFirst().getId());
    }

    @Test
    void collaborationService_inviteUserByEmail_WhenNotExists_ShouldCreateAndSendEmail() {
        String inviterId = "inviter";
        String inviteeEmail = "test@email.com";
        CollaborationsUserModel inviterUser = CollaborationsUserModel.builder()
                .userId(inviterId)
                .invitedCollaborations(new ArrayList<>())
                .build();
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id("collab1")
                .inviterId(inviterId)
                .inviteeEmail(inviteeEmail)
                .status(CollaborationsStatus.PENDING)
                .token("token123")
                .createdAt(LocalDateTime.now())
                .build();

        when(collaborationsUserRepository.findByUserId(inviterId)).thenReturn(Optional.of(inviterUser));
        when(collaborationsRepository.save(any())).thenReturn(collaboration);
        when(collaborationsUserRepository.save(any())).thenReturn(inviterUser);

        CollaborationsModel result = collaborationService.inviteUserByEmail(inviterId, inviteeEmail);

        assertNotNull(result);
        assertEquals(inviterId, result.getInviterId());
        assertEquals(inviteeEmail, result.getInviteeEmail());
        verify(emailService).sendCollaborationInvitationEmail(eq(inviteeEmail), eq(inviteeEmail), anyString());
        verify(collaborationsUserRepository).save(inviterUser);
    }

    @Test
    void collaborationService_inviteUserByEmail_WhenAlreadyExists_ShouldThrow() {
        String inviterId = "inviter";
        String inviteeEmail = "test@email.com";
        String collabId = "collab1";
        CollaborationsModel existing = CollaborationsModel.builder().id(collabId).inviteeEmail(inviteeEmail).build();
        CollaborationsUserModel inviterUser = CollaborationsUserModel.builder()
                .userId(inviterId)
                .invitedCollaborations(new ArrayList<>(List.of(collabId)))
                .build();

        when(collaborationsUserRepository.findByUserId(inviterId)).thenReturn(Optional.of(inviterUser));
        when(collaborationsRepository.findById(collabId)).thenReturn(Optional.of(existing));

        assertThrows(CollaboratorAlreadyExists.class, () -> collaborationService.inviteUserByEmail(inviterId, inviteeEmail));
    }

    @Test
    void collaborationService_addCollaborationIdToCollaborationsUserReceivedByToken_WhenValid_ShouldAdd() {
        String userId = "user3";
        String token = "token123";
        String collabId = "collabId";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id(collabId)
                .inviteeId(userId)
                .build();
        CollaborationsUserModel user = CollaborationsUserModel.builder()
                .userId(userId)
                .receivedCollaborations(new ArrayList<>())
                .build();

        when(collaborationsRepository.findByToken(token)).thenReturn(Optional.of(collaboration));
        when(collaborationsUserRepository.findByUserId(userId)).thenReturn(Optional.of(user));
        when(collaborationsUserRepository.save(any())).thenReturn(user);

        collaborationService.addCollaborationIdToCollaborationsUserReceivedByToken(userId, token);

        assertTrue(user.getReceivedCollaborations().contains(collabId));
        verify(collaborationsUserRepository).save(user);
    }

    @Test
    void collaborationService_addCollaborationIdToCollaborationsUserReceivedByToken_WhenInviteeIdMismatch_ShouldThrow() {
        String userId = "user4";
        String token = "token123";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id("collabId")
                .inviteeId("otherUser")
                .build();
        CollaborationsUserModel user = CollaborationsUserModel.builder().userId(userId).build();

        when(collaborationsRepository.findByToken(token)).thenReturn(Optional.of(collaboration));
        when(collaborationsUserRepository.findByUserId(userId)).thenReturn(Optional.of(user));

        assertThrows(CollaborationsNotAuthorised.class, () -> collaborationService.addCollaborationIdToCollaborationsUserReceivedByToken(userId, token));
    }

    @Test
    void collaborationService_updateCollaborationStatus_WhenValid_ShouldUpdate() {
        String userId = "user5";
        String token = "token123";
        String collabId = "collabId";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id(collabId)
                .token(token)
                .inviteeId(userId)
                .status(CollaborationsStatus.PENDING)
                .build();
        CollaborationsUserModel user = CollaborationsUserModel.builder()
                .userId(userId)
                .receivedCollaborations(new ArrayList<>())
                .build();

        when(collaborationsRepository.findByToken(token)).thenReturn(Optional.of(collaboration));
        when(collaborationsUserRepository.findByUserId(userId)).thenReturn(Optional.of(user));
        when(collaborationsUserRepository.save(any())).thenReturn(user);
        when(collaborationsRepository.save(any())).thenReturn(collaboration);

        CollaborationsModel result = collaborationService.updateCollaborationStatus(userId, token, CollaborationsStatus.ACCEPTED);

        assertEquals(CollaborationsStatus.ACCEPTED, result.getStatus());
        verify(collaborationsRepository).save(collaboration);
        verify(collaborationsUserRepository).save(user);
    }

    @Test
    void collaborationService_updateCollaborationStatus_WhenInviteeIdMismatch_ShouldThrow() {
        String userId = "user6";
        String token = "token123";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id("collabId")
                .token(token)
                .inviteeId("otherUser")
                .status(CollaborationsStatus.PENDING)
                .build();

        when(collaborationsRepository.findByToken(token)).thenReturn(Optional.of(collaboration));

        assertThrows(IllegalStateException.class, () -> collaborationService.updateCollaborationStatus(userId, token, CollaborationsStatus.ACCEPTED));
    }

    @Test
    void collaborationService_updateCollaborationStatus_WhenInvalidStatus_ShouldThrow() {
        String userId = "user7";
        String token = "token123";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id("collabId")
                .token(token)
                .inviteeId(userId)
                .status(CollaborationsStatus.PENDING)
                .build();

        when(collaborationsRepository.findByToken(token)).thenReturn(Optional.of(collaboration));

        assertThrows(IllegalArgumentException.class, () -> collaborationService.updateCollaborationStatus(userId, token, CollaborationsStatus.PENDING));
    }

    @Test
    void collaborationService_removeInvitationAsInviter_WhenValid_ShouldRemove() {
        String inviterId = "inviter";
        String collabId = "collabId";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id(collabId)
                .inviterId(inviterId)
                .build();
        CollaborationsUserModel inviterUser = CollaborationsUserModel.builder()
                .userId(inviterId)
                .invitedCollaborations(new ArrayList<>(List.of(collabId)))
                .build();

        when(collaborationsRepository.findById(collabId)).thenReturn(Optional.of(collaboration));
        when(collaborationsUserRepository.findByUserId(inviterId)).thenReturn(Optional.of(inviterUser));
        when(collaborationsUserRepository.save(any())).thenReturn(inviterUser);

        collaborationService.removeInvitationAsInviter(inviterId, collabId);

        assertFalse(inviterUser.getInvitedCollaborations().contains(collabId));
        verify(collaborationsRepository).deleteById(collabId);
    }

    @Test
    void collaborationService_removeInvitationAsInviter_WhenNotInviter_ShouldThrow() {
        String inviterId = "inviter";
        String collabId = "collabId";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id(collabId)
                .inviterId("otherUser")
                .build();

        when(collaborationsRepository.findById(collabId)).thenReturn(Optional.of(collaboration));

        assertThrows(IllegalStateException.class, () -> collaborationService.removeInvitationAsInviter(inviterId, collabId));
    }

    @Test
    void collaborationService_removeCollaborationAsInvitee_WhenValid_ShouldRemove() {
        String inviteeId = "invitee";
        String inviterId = "inviter";
        String collabId = "collabId";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id(collabId)
                .inviterId(inviterId)
                .inviteeId(inviteeId)
                .build();
        CollaborationsUserModel inviteeUser = CollaborationsUserModel.builder()
                .userId(inviteeId)
                .receivedCollaborations(new ArrayList<>(List.of(collabId)))
                .build();
        CollaborationsUserModel inviterUser = CollaborationsUserModel.builder()
                .userId(inviterId)
                .invitedCollaborations(new ArrayList<>(List.of(collabId)))
                .build();

        when(collaborationsRepository.findById(collabId)).thenReturn(Optional.of(collaboration));
        when(collaborationsUserRepository.findByUserId(inviteeId)).thenReturn(Optional.of(inviteeUser));
        when(collaborationsUserRepository.findByUserId(inviterId)).thenReturn(Optional.of(inviterUser));
        when(collaborationsUserRepository.save(any())).thenReturn(inviteeUser);

        collaborationService.removeCollaborationAsInvitee(inviteeId, collabId);

        assertFalse(inviteeUser.getReceivedCollaborations().contains(collabId));
        assertFalse(inviterUser.getInvitedCollaborations().contains(collabId));
        verify(collaborationsRepository).deleteById(collabId);
    }

    @Test
    void collaborationService_removeCollaborationAsInvitee_WhenNotInvitee_ShouldThrow() {
        String inviteeId = "invitee";
        String collabId = "collabId";
        CollaborationsModel collaboration = CollaborationsModel.builder()
                .id(collabId)
                .inviteeId("otherUser")
                .build();

        when(collaborationsRepository.findById(collabId)).thenReturn(Optional.of(collaboration));

        assertThrows(IllegalStateException.class, () -> collaborationService.removeCollaborationAsInvitee(inviteeId, collabId));
    }
}