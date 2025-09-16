package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CollaboratorAlreadyExistsTest {
    @Test
    void collaboratorAlreadyExists_collaboratorAlreadyExists_testMessageIsSetCorrectly() {
        CollaboratorAlreadyExists ex = new CollaboratorAlreadyExists("test@example.com");
        assertEquals("Collaborator with the email: test@example.com already exists", ex.getMessage());
    }

    @Test
    void collaboratorAlreadyExists_collaboratorAlreadyExists_testIsRuntimeException() {
        CollaboratorAlreadyExists ex = new CollaboratorAlreadyExists("email");
        assertInstanceOf(RuntimeException.class, ex);
    }
}