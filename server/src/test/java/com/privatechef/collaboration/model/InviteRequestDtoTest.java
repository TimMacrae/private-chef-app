package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InviteRequestDtoTest {

    @Test
    void inviteRequestDto_testGetterAndSetter() {
        InviteRequestDto dto = new InviteRequestDto();
        dto.setEmail("test@example.com");
        assertEquals("test@example.com", dto.getEmail());
    }
}