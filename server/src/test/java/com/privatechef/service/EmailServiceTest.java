package com.privatechef.service;

import brevoApi.TransactionalEmailsApi;
import brevoModel.SendSmtpEmail;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

class EmailServiceTest {

    @Mock
    private TransactionalEmailsApi emailsApi;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        emailService = new EmailService(emailsApi);
        ReflectionTestUtils.setField(emailService, "emailSender", "sender@email.com");
        ReflectionTestUtils.setField(emailService, "emailSenderName", "Sender Name");
        ReflectionTestUtils.setField(emailService, "brevoInvitationFrontendLink", "http://frontend/invite");
    }

    @Test
    void sendCollaborationInvitationEmail_shouldCallApiWithCorrectParams() throws Exception {
        emailService.sendCollaborationInvitationEmail("to@email.com", "To Name", "token123");

        ArgumentCaptor<SendSmtpEmail> captor = ArgumentCaptor.forClass(SendSmtpEmail.class);
        verify(emailsApi).sendTransacEmail(captor.capture());
        SendSmtpEmail sent = captor.getValue();

        // Basic assertions on the constructed email
        assertEquals("sender@email.com", sent.getSender().getEmail());
        assertEquals("Sender Name", sent.getSender().getName());
        assertEquals("to@email.com", sent.getTo().getFirst().getEmail());
        assertEquals("To Name", sent.getTo().getFirst().getName());
        assertEquals(10L, sent.getTemplateId());
        assertEquals("http://frontend/invite/token123", ((Map<String, Object>) sent.getParams()).get("URL"));
    }

    @Test
    void sendCollaborationInvitationEmail_shouldLogErrorOnException() throws Exception {
        doThrow(new RuntimeException("API error")).when(emailsApi).sendTransacEmail(any(SendSmtpEmail.class));

        // Should not throw, just log
        emailService.sendCollaborationInvitationEmail("to@email.com", "To Name", "token123");
        verify(emailsApi).sendTransacEmail(any(SendSmtpEmail.class));
    }
}