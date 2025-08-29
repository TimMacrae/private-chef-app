package com.privatechef.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GlobalExceptionHandlerTest {
    @Test
    void globalExceptionHandler_testHandleAllExceptions() {
        GlobalExceptionHandler handler = new GlobalExceptionHandler();
        Exception ex = new Exception("Test exception");
        WebRequest request = mock(WebRequest.class);
        when(request.getDescription(false)).thenReturn("/test/path");

        ResponseEntity<Object> response = handler.handleAllExceptions(ex, request);

        assertEquals(500, response.getStatusCode().value());
        assertInstanceOf(ExceptionMessage.class, response.getBody());

        ExceptionMessage body = (ExceptionMessage) response.getBody();
        assertEquals("Internal server error: Test exception", body.message());
        assertEquals("/test/path", body.path());
        assertNotNull(body.timestamp());
    }
}