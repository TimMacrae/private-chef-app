package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CollaboratorNotFoundTest {
    @Test
    void collaboratorNotFound_testMessageIsSetCorrectly() {
        CollaboratorNotFound ex = new CollaboratorNotFound("user@example.com");
        assertEquals("Collaborator not found with email: user@example.com", ex.getMessage());
    }

    @Test
    void collaboratorNotFound_testIsRuntimeException() {
        CollaboratorNotFound ex = new CollaboratorNotFound("email");
        assertInstanceOf(RuntimeException.class, ex);
    }
}