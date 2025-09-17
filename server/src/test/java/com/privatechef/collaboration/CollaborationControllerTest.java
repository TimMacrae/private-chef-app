package com.privatechef.collaboration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.privatechef.auth.AuthService;
import com.privatechef.collaboration.model.*;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.exception.CollaborationsModelNotFound;
import com.privatechef.exception.CollaboratorAlreadyExists;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class CollaborationControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CollaborationService collaborationService;

    @Autowired
    private AuthService authService;

    @TestConfiguration
    static class MockConfig {
        @Bean
        public CollaborationService collaborationService() {
            return Mockito.mock(CollaborationService.class);
        }

        @Bean
        public AuthService authService() {
            return Mockito.mock(AuthService.class);
        }
    }

    @Test
    void collaborationController_getCollaborationUser_shouldReturnUser() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-1";
        CollaborationsModel model1 = new CollaborationsModel();
        CollaborationsModel model2 = new CollaborationsModel();
        CollaborationsUserDto userDto = new CollaborationsUserDto(
                "1",
                userId,
                "test@email.de",
                List.of(model1),
                List.of(model2)
        );
        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(collaborationService.getCollaborationUser(userId)).thenReturn(userDto);

        mockMvc.perform(get(EndpointsConfig.COLLABORATION)
                        .with(jwt().jwt(jwt)))
                .andExpect(status().isOk());
    }

    @Test
    void collaborationController_updateCollaboratorStatus_shouldReturnUpdatedModel() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-2";
        UpdateStatusRequestDto request = new UpdateStatusRequestDto();
        request.setToken("tok");
        request.setStatus(CollaborationsStatus.ACCEPTED);

        CollaborationsModel model = new CollaborationsModel();
        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(collaborationService.updateCollaborationStatus(eq(userId), eq("tok"), eq(CollaborationsStatus.ACCEPTED)))
                .thenReturn(model);

        mockMvc.perform(put(EndpointsConfig.COLLABORATION + "/status")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void collaborationController_inviteUserByEmail_shouldReturnModel() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-3";
        InviteRequestDto request = new InviteRequestDto();
        request.setEmail("test@example.com");

        CollaborationsModel model = new CollaborationsModel();
        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(collaborationService.inviteUserByEmail(eq(userId), eq("test@example.com")))
                .thenReturn(model);

        mockMvc.perform(post(EndpointsConfig.COLLABORATION + "/invite")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void collaborationController_addCollaborationToUserReceived_shouldReturnNoContent() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-4";
        String token = "token-123";
        when(authService.getCurrentUserId(any())).thenReturn(userId);

        mockMvc.perform(post(EndpointsConfig.COLLABORATION + "/receive/" + token)
                        .with(jwt().jwt(jwt)))
                .andExpect(status().isNoContent());
    }

    @Test
    void collaborationController_removeInvitationAsInviter_shouldReturnNoContent() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-5";
        DeleteRequestDto request = new DeleteRequestDto();
        request.setCollaborationId("collab-1");
        when(authService.getCurrentUserId(any())).thenReturn(userId);

        mockMvc.perform(delete(EndpointsConfig.COLLABORATION)
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());
    }

    @Test
    void collaborationController_removeCollaborationAsInvitee_shouldReturnNoContent() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-6";
        DeleteRequestDto request = new DeleteRequestDto();
        request.setCollaborationId("collab-2");
        when(authService.getCurrentUserId(any())).thenReturn(userId);

        mockMvc.perform(delete(EndpointsConfig.COLLABORATION + "/invitee")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());
    }

    @Test
    void collaborationController_getCollaborationUser_shouldReturnNotFound_whenModelNotFound() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-7";
        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(collaborationService.getCollaborationUser(userId))
                .thenThrow(new CollaborationsModelNotFound("notfound"));

        mockMvc.perform(get(EndpointsConfig.COLLABORATION)
                        .with(jwt().jwt(jwt)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(new CollaborationsModelNotFound("notfound").getMessage()));
    }

    @Test
    void collaborationController_inviteUserByEmail_shouldReturnConflict_whenAlreadyExists() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-8";
        InviteRequestDto request = new InviteRequestDto();
        request.setEmail("exists@example.com");
        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(collaborationService.inviteUserByEmail(eq(userId), eq("exists@example.com")))
                .thenThrow(new CollaboratorAlreadyExists("exists@example.com"));

        mockMvc.perform(post(EndpointsConfig.COLLABORATION + "/invite")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value(new CollaboratorAlreadyExists("exists@example.com").getMessage()));
    }

    @Test
    void collaborationController_updateCollaboratorStatus_shouldReturnBadRequest_onIllegalArgument() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user-9";
        UpdateStatusRequestDto request = new UpdateStatusRequestDto();
        request.setToken("tok");
        request.setStatus(CollaborationsStatus.ACCEPTED);

        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(collaborationService.updateCollaborationStatus(eq(userId), eq("tok"), eq(CollaborationsStatus.ACCEPTED)))
                .thenThrow(new IllegalArgumentException("bad arg"));

        mockMvc.perform(put(EndpointsConfig.COLLABORATION + "/status")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("bad arg"));
    }
}