package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CollaborationsUserDtoTest {
    @Test
    void collaborationsUserDto_testBuilderSetsFields() {
        CollaborationsModel invited = CollaborationsModel.builder().inviterId("a").build();
        CollaborationsModel received = CollaborationsModel.builder().inviteeId("b").build();

        CollaborationsUserDto dto = CollaborationsUserDto.builder()
                .id("1")
                .userId("user123")
                .email("test@example.com")
                .invitedCollaborations(List.of(invited))
                .receivedCollaborations(List.of(received))
                .build();

        assertEquals("1", dto.getId());
        assertEquals("user123", dto.getUserId());
        assertEquals("test@example.com", dto.getEmail());
        assertEquals(1, dto.getInvitedCollaborations().size());
        assertEquals(1, dto.getReceivedCollaborations().size());
    }

    @Test
    void collaborationsUserDto_testAllArgsConstructor() {
        CollaborationsModel invited = CollaborationsModel.builder().inviterId("a").build();
        CollaborationsModel received = CollaborationsModel.builder().inviteeId("b").build();

        CollaborationsUserDto dto = new CollaborationsUserDto(
                "2", "user456", "user@example.com",
                List.of(invited), List.of(received)
        );

        assertEquals("2", dto.getId());
        assertEquals("user456", dto.getUserId());
        assertEquals("user@example.com", dto.getEmail());
        assertEquals(invited, dto.getInvitedCollaborations().getFirst());
        assertEquals(received, dto.getReceivedCollaborations().getFirst());
    }
}