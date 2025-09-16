package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class CollaborationsModelTest {
    @Test
    void collaborationsModel_testBuilderSetsFieldsAndDefaults() {
        String inviterId = "inviter123";
        String inviteeId = "invitee456";
        String inviteeEmail = "test@example.com";
        String token = "token123";

        CollaborationsModel model = CollaborationsModel.builder()
                .inviterId(inviterId)
                .inviteeId(inviteeId)
                .inviteeEmail(inviteeEmail)
                .token(token)
                .build();

        assertNull(model.getId());
        assertEquals(inviterId, model.getInviterId());
        assertEquals(inviteeId, model.getInviteeId());
        assertEquals(inviteeEmail, model.getInviteeEmail());
        assertEquals(token, model.getToken());
        assertEquals(CollaborationsStatus.PENDING, model.getStatus());
        assertNotNull(model.getCreatedAt());
        assertNull(model.getUpdatedAt());
    }

    @Test
    void collaborationsModel_testAllArgsConstructor() {
        LocalDateTime now = LocalDateTime.now();
        CollaborationsModel model = new CollaborationsModel(
                "id1", "inviter", "invitee", "email@test.com",
                CollaborationsStatus.ACCEPTED, "token", now, now
        );

        assertEquals(CollaborationsStatus.ACCEPTED, model.getStatus());
        assertEquals("token", model.getToken());
        assertEquals(now, model.getCreatedAt());
        assertEquals(now, model.getUpdatedAt());
    }

    @Test
    void collaborationsModel_testNoArgsConstructorAndSetters() {
        CollaborationsModel model = new CollaborationsModel();
        model.setId("id2");
        model.setInviterId("inviter2");
        model.setInviteeId("invitee2");
        model.setInviteeEmail("email2@test.com");
        model.setStatus(CollaborationsStatus.ACCEPTED);
        model.setToken("token2");
        LocalDateTime now = LocalDateTime.now();
        CollaborationsModel newModel = new CollaborationsModel(
                "id1", "inviter", "invitee", "email@test.com",
                CollaborationsStatus.ACCEPTED, "token", now, now
        );

        assertEquals("id2", model.getId());
        assertEquals("inviter2", model.getInviterId());
        assertEquals("invitee2", model.getInviteeId());
        assertEquals("email2@test.com", model.getInviteeEmail());
        LocalDateTime newNow = LocalDateTime.now();
        newModel.setCreatedAt(now);
        newModel.setUpdatedAt(now);

        assertEquals("id1", newModel.getId());
        assertEquals("inviter", newModel.getInviterId());
        assertEquals("invitee", newModel.getInviteeId());
        assertEquals("email@test.com", newModel.getInviteeEmail());
        assertEquals(CollaborationsStatus.ACCEPTED, newModel.getStatus());
        assertEquals("token", newModel.getToken());
        assertEquals(now, newModel.getCreatedAt());
        assertEquals(now, newModel.getUpdatedAt());
    }

}