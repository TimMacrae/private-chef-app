package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DeleteRequestDtoTest {

    @Test
    void testGetterAndSetter() {
        DeleteRequestDto dto = new DeleteRequestDto();
        dto.setCollaborationId("abc123");
        assertEquals("abc123", dto.getCollaborationId());
    }
}