package com.privatechef.config;

import brevo.ApiClient;
import brevo.Configuration;
import brevo.auth.ApiKeyAuth;
import brevoApi.TransactionalEmailsApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class BrevoConfig {

    @Bean
    public TransactionalEmailsApi transactionalEmailsApi(
            @Value("${brevo.apiKey}") String apiKey) {

        // Create the default ApiClient from the SDK
        ApiClient defaultClient = Configuration.getDefaultApiClient();

        // Configure the API key authorization
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apiKey);
        return new TransactionalEmailsApi(defaultClient);
    }
}
