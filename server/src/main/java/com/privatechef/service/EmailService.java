package com.privatechef.service;

import brevoApi.TransactionalEmailsApi;
import brevoModel.SendSmtpEmail;
import brevoModel.SendSmtpEmailSender;
import brevoModel.SendSmtpEmailTo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final TransactionalEmailsApi emailsApi;

    @Value("${brevo.sender.email}")
    String emailSender;

    @Value("${brevo.sender.name}")
    String emailSenderName;

    @Value("${brevo.invitation.frontend.link}")
    String brevoInvitationFrontendLink;

    @Async
    public void sendCollaborationInvitationEmail(String toEmail, String toName, String url) {
        long templateId = 10;
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("URL", brevoInvitationFrontendLink + url); // will be available in the template as {{ params.URL }}

            SendSmtpEmail email = new SendSmtpEmail()
                    .sender(new SendSmtpEmailSender()
                            .email(emailSender)
                            .name(emailSenderName))
                    .to(Collections.singletonList(new SendSmtpEmailTo()
                            .email(toEmail)
                            .name(toName)))
                    .templateId(templateId)
                    .params(params);

            emailsApi.sendTransacEmail(email);
        } catch (Exception e) {
            log.error("Failed to send Brevo email (templateId={}): {}", templateId, e.getMessage(), e);
            // decide if you want to rethrow or swallow
        }
    }
}
