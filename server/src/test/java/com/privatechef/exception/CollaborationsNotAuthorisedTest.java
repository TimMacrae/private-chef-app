package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CollaborationsNotAuthorisedTest {
    @Test
    void collaborationsNotAuthorised_testMessageIsSetCorrectly() {
        CollaborationsNotAuthorised ex = new CollaborationsNotAuthorised("collab42");
        assertEquals("You are not authorized for this collaboration: collab42", ex.getMessage());
    }

    @Test
    void collaborationsNotAuthorised_testIsRuntimeException() {
        CollaborationsNotAuthorised ex = new CollaborationsNotAuthorised("id");
        assertInstanceOf(RuntimeException.class, ex);
    }
}