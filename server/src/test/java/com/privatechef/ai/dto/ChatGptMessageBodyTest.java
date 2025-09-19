package com.privatechef.ai.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatGptMessageBodyTest {
    @Test
    void chatGptMessageBody_testMessageGetter() {
        ChatGptMessageBody body = new ChatGptMessageBody("hello");
        assertEquals("hello", body.message());
    }
}