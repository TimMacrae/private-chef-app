package com.privatechef.ai.dto;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ChatGptMessageResponseTest {

    @Test
    void chatGptMessageResponse_getFirstOutputText_returnsText_whenPresent() {
        ChatGptMessageResponse.Output.Content content = new ChatGptMessageResponse.Output.Content();
        content.setText("hello");
        content.setType("text");

        ChatGptMessageResponse.Output output = new ChatGptMessageResponse.Output();
        output.setContent(List.of(content));

        ChatGptMessageResponse response = new ChatGptMessageResponse();
        response.setOutput(List.of(output));

        assertEquals("hello", response.getFirstOutputText());
    }

    @Test
    void chatGptMessageResponse_getFirstOutputText_returnsNull_whenNoOutput() {
        ChatGptMessageResponse response = new ChatGptMessageResponse();
        response.setOutput(null);
        assertNull(response.getFirstOutputText());

        response.setOutput(List.of());
        assertNull(response.getFirstOutputText());
    }

    @Test
    void chatGptMessageResponse_getFirstOutputText_returnsNull_whenNoContent() {
        ChatGptMessageResponse.Output output = new ChatGptMessageResponse.Output();
        output.setContent(null);

        ChatGptMessageResponse response = new ChatGptMessageResponse();
        response.setOutput(List.of(output));

        assertNull(response.getFirstOutputText());

        output.setContent(List.of());
        assertNull(response.getFirstOutputText());
    }

}