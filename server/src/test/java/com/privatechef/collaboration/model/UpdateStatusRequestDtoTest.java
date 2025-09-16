package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UpdateStatusRequestDtoTest {
    @Test
    void updateStatusRequestDto_testGetterAndSetter() {
        UpdateStatusRequestDto dto = new UpdateStatusRequestDto();
        dto.setToken("tok123");
        dto.setStatus(CollaborationsStatus.ACCEPTED);

        assertEquals("tok123", dto.getToken());
        assertEquals(CollaborationsStatus.ACCEPTED, dto.getStatus());
    }
}