package com.privatechef.meal_planning;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.privatechef.auth.AuthService;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.exception.MealPlanningModelNotFound;
import com.privatechef.meal_planning.model.MealPlanningDayModel;
import com.privatechef.meal_planning.model.MealPlanningModel;
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


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class MealPlaningControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MealPlanningService mealPlaningService;

    @Autowired
    private AuthService authService;

    @TestConfiguration
    static class MockConfig {
        @Bean
        public MealPlanningService mealPlaningService() {
            return Mockito.mock(MealPlanningService.class);
        }

        @Bean
        public AuthService authService() {
            return Mockito.mock(AuthService.class);
        }
    }

    @Test
    void getMealPlanning_shouldReturnMealPlaning() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String id = "meal-id-1";
        String userId = "user-123";

        MealPlanningModel mealPlanning = MealPlanningModel.builder()
                .id(id)
                .userId(userId)
                .build();

        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(mealPlaningService.getMealPlaning(userId)).thenReturn(mealPlanning);

        mockMvc.perform(get(EndpointsConfig.MEAL_PLANNING)
                        .with(jwt().jwt(jwt)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.userId").value(userId));
    }

    @Test
    void updateMealPlanning_shouldUpdateMealPlaning() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String id = "meal-id-1";
        String userId = "user-123";
        MealPlanningDayModel updateMonday = new MealPlanningDayModel(true, true, true);

        MealPlanningModel request = MealPlanningModel.builder()
                .id(id)
                .userId(userId)
                .monday(updateMonday)
                .build();

        MealPlanningModel updated = MealPlanningModel.builder()
                .id(id)
                .userId(userId)
                .monday(updateMonday)
                .build();

        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(mealPlaningService.updateMealPlaning(eq(userId), any(MealPlanningModel.class))).thenReturn(updated);

        mockMvc.perform(put(EndpointsConfig.MEAL_PLANNING)
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.userId").value(userId))
                .andExpect(jsonPath("$.monday").value(updateMonday));
    }

    @Test
    void updateMealPlanning_shouldThrowAnError() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String id = "unknown";
        String userId = "unknownUser";


        MealPlanningModel request = MealPlanningModel.builder()
                .id(id)
                .userId(userId)
                .monday(new MealPlanningDayModel(true, false, true))
                .build();

        when(authService.getCurrentUserId(any())).thenReturn(userId);
        when(mealPlaningService.updateMealPlaning(eq(userId), any(MealPlanningModel.class)))
                .thenThrow(new MealPlanningModelNotFound(userId));

        mockMvc.perform(put(EndpointsConfig.MEAL_PLANNING)
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(new MealPlanningModelNotFound(userId).getMessage()));
    }
}