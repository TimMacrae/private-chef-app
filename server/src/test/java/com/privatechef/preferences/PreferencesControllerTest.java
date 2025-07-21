package com.privatechef.preferences;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.privatechef.auth.AuthService;
import com.privatechef.config.RoutesConfig;
import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.preferences.dto.PreferencesDto;
import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PreferencesController.class)
class PreferencesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PreferencesService preferencesService;

    @Autowired
    private AuthService authService;

    @TestConfiguration
    static class MockConfig {

        @Bean
        public PreferencesService preferencesService() {
            return Mockito.mock(PreferencesService.class);
        }

        @Bean
        public AuthService authService() {
            return Mockito.mock(AuthService.class);
        }
    }

    @Test
    void shouldReturnUserPreferences() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String id = "id12";
        String userId = "user-123";

        PreferencesDto preferences = new PreferencesDto();
        preferences.setId(id);
        preferences.setUserId(userId);


        Mockito.when(authService.getCurrentUserId(any())).thenReturn(userId);
        Mockito.when(preferencesService.getUserPreferences(userId)).thenReturn(preferences);

        mockMvc.perform(get(RoutesConfig.API_PREFERENCES)
                        .with(jwt().jwt(jwt)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.userId").value(userId));
    }

    @Test
    void shouldUpdateUserPreferences() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String id = "id12";
        String userId = "user-123";
        List<String> likes = new ArrayList<>(List.of("Pizza"));
        BudgetLevel budgetLevel = BudgetLevel.LOW;
        int maxPrepTimeMinutes = 60;
        CookingSkillLevel cookingSkillLevel = CookingSkillLevel.values()[0];


        PreferencesDto request = new PreferencesDto();
        request.setId(id);
        request.setLikes(likes);
        request.setUserId(userId);
        request.setBudgetLevel(budgetLevel);
        request.setMaxPrepTimeMinutes(maxPrepTimeMinutes);
        request.setCookingSkillLevel(cookingSkillLevel);
        request.setLikes(likes);

        PreferencesDto updated = new PreferencesDto();
        updated.setId(id);
        updated.setLikes(likes);
        updated.setUserId(userId);
        updated.setBudgetLevel(budgetLevel);
        updated.setMaxPrepTimeMinutes(maxPrepTimeMinutes);
        updated.setCookingSkillLevel(cookingSkillLevel);
        updated.setLikes(likes);


        Mockito.when(preferencesService.updateUserPreferences(userId, request)).thenReturn(updated);

        mockMvc.perform(put(RoutesConfig.API_PREFERENCES)
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.userId").value(userId))
                .andExpect(jsonPath("$.likes").value(likes))

                .andExpect(jsonPath("$.budgetLevel").value(budgetLevel.name()))
                .andExpect(jsonPath("$.maxPrepTimeMinutes").value(maxPrepTimeMinutes))
                .andExpect(jsonPath("$.cookingSkillLevel").value(cookingSkillLevel.name()));
    }

    @Test
    void updateUserPreferencesShould_shouldThrowAnError() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String id = "unknown";
        String userId = "unknownUser";
        List<String> likes = new ArrayList<>(List.of("Pizza"));


        PreferencesDto request = new PreferencesDto();
        request.setId(id);
        request.setLikes(likes);
        request.setUserId(userId);

        Mockito.when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(preferencesService.updateUserPreferences(eq(userId), any(PreferencesDto.class)))
                .thenThrow(new PreferencesModelNotFound(userId));

        mockMvc.perform(put(RoutesConfig.API_PREFERENCES)
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(new PreferencesModelNotFound(userId).getMessage()));

    }
}
