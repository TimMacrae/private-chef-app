package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PreferencesModelNotFoundTest {

    @Test
    void shouldContainCorrectMessage_whenConstructed() {
        String id = "123";
        assertThrows(
                PreferencesModelNotFound.class,
                () -> {
                    throw new PreferencesModelNotFound(id);
                }
        );


    }
}