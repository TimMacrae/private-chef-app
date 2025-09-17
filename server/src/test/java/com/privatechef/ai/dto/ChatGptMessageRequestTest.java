package com.privatechef.ai.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatGptMessageRequestTest {
    @Test
    void chatGptMessageRequest_testNoArgsConstructorAndSetters() {
        ChatGptMessageRequest req = new ChatGptMessageRequest();
        req.setModel("gpt-4");
        req.setInput("Hello");
        assertEquals("gpt-4", req.getModel());
        assertEquals("Hello", req.getInput());
    }

    @Test
    void chatGptMessageRequest_testAllArgsConstructor() {
        ChatGptMessageRequest req = new ChatGptMessageRequest("gpt-3", "Hi");
        assertEquals("gpt-3", req.getModel());
        assertEquals("Hi", req.getInput());
    }
}