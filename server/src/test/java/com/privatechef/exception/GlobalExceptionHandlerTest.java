package com.privatechef.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GlobalExceptionHandlerTest {
    @Test
    void testHandleAllExceptions() {
        GlobalExceptionHandler handler = new GlobalExceptionHandler();
        Exception ex = new Exception("Test exception");
        WebRequest request = mock(WebRequest.class);
        when(request.getDescription(false)).thenReturn("/test/path");

        ResponseEntity<Object> response = handler.handleAllExceptions(ex, request);

        assertEquals(500, response.getStatusCode().value());
        assertInstanceOf(Map.class, response.getBody());

        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertEquals("An unexpected error occurred.", body.get("message"));
        assertEquals("Test exception", body.get("details"));
        assertEquals("/test/path", body.get("path"));
        assertNotNull(body.get("timestamp"));
    }
}