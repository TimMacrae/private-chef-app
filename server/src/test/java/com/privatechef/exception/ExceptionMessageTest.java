package com.privatechef.exception;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ExceptionMessageTest {
    @Test
    void exceptionMessage_fullConstructorSetsAllFields() {
        LocalDateTime now = LocalDateTime.now();
        ExceptionMessage em = new ExceptionMessage("error", "/path", now);
        assertEquals("error", em.message());
        assertEquals("/path", em.path());
        assertEquals(now, em.timestamp());
    }

    @Test
    void exceptionMessage_twoArgConstructorSetsMessagePathAndTimestampNow() {
        ExceptionMessage em = new ExceptionMessage("error", "/path");
        assertEquals("error", em.message());
        assertEquals("/path", em.path());
        assertNotNull(em.timestamp());
    }

    @Test
    void exceptionMessage_oneArgConstructorSetsMessageEmptyPathAndTimestampNow() {
        ExceptionMessage em = new ExceptionMessage("error");
        assertEquals("error", em.message());
        assertEquals("", em.path());
        assertNotNull(em.timestamp());
    }
}