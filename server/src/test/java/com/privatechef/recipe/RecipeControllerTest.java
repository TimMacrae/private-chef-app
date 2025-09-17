package com.privatechef.recipe;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.privatechef.auth.AuthService;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.meal_planning.MealPlanningService;
import com.privatechef.recipe.model.RecipeGenerateRequestDto;
import com.privatechef.recipe.model.RecipeModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipeController.class)
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockConfig {
        @Bean
        public RecipeService recipeService() {
            return Mockito.mock(RecipeService.class);
        }

        @Bean
        public AuthService authService() {
            return Mockito.mock(AuthService.class);
        }
    }

    @Test
    void recipeController_getRecipes_returnsRecipes() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user123";
        Set<RecipeModel> recipes = Set.of(RecipeModel.builder().userId(userId).title("Test").build());

        Mockito.when(authService.getCurrentUserId(any(Jwt.class))).thenReturn(userId);
        Mockito.when(recipeService.getRecipes(userId)).thenReturn(recipes);

        mockMvc.perform(get(EndpointsConfig.RECIPES).with(jwt().jwt(jwt)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userId").value(userId))
                .andExpect(jsonPath("$[0].title").value("Test"));
    }

    @Test
    void recipeController_generateRecipe_returnsRecipe() throws Exception {
        Jwt jwt = Mockito.mock(Jwt.class);
        String userId = "user123";
        RecipeGenerateRequestDto requestDto = new RecipeGenerateRequestDto();
        RecipeModel recipeModel = RecipeModel.builder().userId(userId).title("Generated").build();

        Mockito.when(authService.getCurrentUserId(any(Jwt.class))).thenReturn(userId);
        Mockito.when(recipeService.generateRecipe(eq(userId), any(RecipeGenerateRequestDto.class))).thenReturn(recipeModel);

        mockMvc.perform(post(EndpointsConfig.RECIPES + "/generate-recipe")
                        .with(jwt().jwt(jwt))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(userId))
                .andExpect(jsonPath("$.title").value("Generated"));
    }
}