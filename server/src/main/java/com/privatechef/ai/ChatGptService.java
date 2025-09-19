package com.privatechef.ai;

import com.privatechef.ai.dto.ChatGptMessageBody;
import com.privatechef.ai.dto.ChatGptMessageRequest;
import com.privatechef.ai.dto.ChatGptMessageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ChatGptService {
    private final RestClient restClient;

    public ChatGptService(
            RestClient.Builder restClientBuilder,
            @Value("${chatgpt.api.key}") String apiKey,
            @Value("${chatgpt.api.baseurl}") String baseUrl
    ) {
        this.restClient = restClientBuilder
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    public ChatGptMessageResponse sendMessage(ChatGptMessageBody message) {
        ChatGptMessageRequest messageRequest = new ChatGptMessageRequest("gpt-4.1", message.message());
        return restClient.post().uri("").body(messageRequest).retrieve().body(ChatGptMessageResponse.class);
    }
}
