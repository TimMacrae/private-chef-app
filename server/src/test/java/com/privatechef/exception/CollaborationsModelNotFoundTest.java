package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CollaborationsModelNotFoundTest {
    @Test
    void collaborationsModelNotFound_testMessageIsSetCorrectly() {
        CollaborationsModelNotFound ex = new CollaborationsModelNotFound("abc123");
        assertEquals("Collaboration not found with the id: abc123", ex.getMessage());
    }

    @Test
    void collaborationsModelNotFound_testIsRuntimeException() {
        CollaborationsModelNotFound ex = new CollaborationsModelNotFound("id");
        assertInstanceOf(RuntimeException.class, ex);
    }
}