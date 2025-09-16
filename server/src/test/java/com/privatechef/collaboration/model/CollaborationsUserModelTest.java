package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CollaborationsUserModelTest {
    @Test
    void collaborationsUserModel_testBuilderSetsFieldsAndDefaults() {
        CollaborationsUserModel model = CollaborationsUserModel.builder()
                .id("1")
                .userId("user123")
                .email("test@example.com")
                .invitedCollaborations(List.of("collab1", "collab2"))
                .receivedCollaborations(List.of("collab3"))
                .build();

        assertEquals("1", model.getId());
        assertEquals("user123", model.getUserId());
        assertEquals("test@example.com", model.getEmail());
        assertEquals(List.of("collab1", "collab2"), model.getInvitedCollaborations());
        assertEquals(List.of("collab3"), model.getReceivedCollaborations());
    }

    @Test
    void collaborationsUserModel_testBuilderDefaultsToEmptyLists() {
        CollaborationsUserModel model = CollaborationsUserModel.builder()
                .id("2")
                .userId("user456")
                .email("user@example.com")
                .build();

        assertNotNull(model.getInvitedCollaborations());
        assertNotNull(model.getReceivedCollaborations());
        assertTrue(model.getInvitedCollaborations().isEmpty());
        assertTrue(model.getReceivedCollaborations().isEmpty());
    }

    @Test
    void collaborationsUserModel_testAllArgsConstructor() {
        List<String> invited = List.of("a", "b");
        List<String> received = List.of("c");
        CollaborationsUserModel model = new CollaborationsUserModel(
                "3", "user789", "mail@test.com", invited, received
        );

        assertEquals("3", model.getId());
        assertEquals("user789", model.getUserId());
        assertEquals("mail@test.com", model.getEmail());
        assertEquals(invited, model.getInvitedCollaborations());
        assertEquals(received, model.getReceivedCollaborations());
    }

    @Test
    void collaborationsUserModel_testNoArgsConstructorAndSetters() {
        CollaborationsUserModel model = new CollaborationsUserModel();
        model.setId("4");
        model.setUserId("user000");
        model.setEmail("zero@test.com");
        model.setInvitedCollaborations(List.of("x"));
        model.setReceivedCollaborations(List.of("y", "z"));

        assertEquals("4", model.getId());
        assertEquals("user000", model.getUserId());
        assertEquals("zero@test.com", model.getEmail());
        assertEquals(List.of("x"), model.getInvitedCollaborations());
        assertEquals(List.of("y", "z"), model.getReceivedCollaborations());
    }

}