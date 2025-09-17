package com.privatechef.ai;

import com.privatechef.ai.dto.ChatGptMessageBody;
import com.privatechef.ai.dto.ChatGptMessageRequest;
import com.privatechef.ai.dto.ChatGptMessageResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.web.client.RestClient;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class ChatGptServiceTest {
    @Mock
    private RestClient.Builder restClientBuilder;
    @Mock
    private RestClient restClient;
    @Mock
    private RestClient.RequestBodyUriSpec requestBodyUriSpec;
    @Mock
    private RestClient.RequestBodySpec requestBodySpec;
    @Mock
    private RestClient.ResponseSpec responseSpec;

    private ChatGptService chatGptService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        when(restClientBuilder.baseUrl(anyString())).thenReturn(restClientBuilder);
        when(restClientBuilder.defaultHeader(anyString(), anyString())).thenReturn(restClientBuilder);
        when(restClientBuilder.build()).thenReturn(restClient);

        chatGptService = new ChatGptService(restClientBuilder, "fake-api-key", "http://fake-url");
    }

    @Test
    void chatGptService_sendMessage_sendsRequestAndReturnsResponse() {
        when(restClient.post()).thenReturn(requestBodyUriSpec);
        when(requestBodyUriSpec.uri(eq(""))).thenReturn(requestBodySpec);
        when(requestBodySpec.body(any(ChatGptMessageRequest.class))).thenReturn(requestBodySpec);
        when(requestBodySpec.retrieve()).thenReturn(responseSpec);

        ChatGptMessageResponse expected = new ChatGptMessageResponse();
        when(responseSpec.body(ChatGptMessageResponse.class)).thenReturn(expected);

        ChatGptMessageResponse actual =
                chatGptService.sendMessage(new ChatGptMessageBody("test message"));

        assertSame(expected, actual);
        verify(restClient).post();
        verify(requestBodyUriSpec).uri(eq(""));
        verify(requestBodySpec).body(any(ChatGptMessageRequest.class));
        verify(requestBodySpec).retrieve();
        verify(responseSpec).body(ChatGptMessageResponse.class);

        ArgumentCaptor<ChatGptMessageRequest> captor =
                ArgumentCaptor.forClass(ChatGptMessageRequest.class);
        verify(requestBodySpec).body(captor.capture());
        ChatGptMessageRequest sent = captor.getValue();
        assertEquals("gpt-4.1", sent.getModel());
        assertEquals("test message", sent.getInput());
    }
}