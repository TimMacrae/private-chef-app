package com.privatechef.recipe;

import com.privatechef.ai.ChatGptPromptService;
import com.privatechef.ai.ChatGptService;
import com.privatechef.ai.dto.ChatGptMessageBody;
import com.privatechef.ai.dto.ChatGptMessageResponse;
import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.exception.RecipeNotFound;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.preferences.repository.PreferencesRepository;
import com.privatechef.recipe.model.MealType;
import com.privatechef.recipe.model.RecipeGenerateRequestDto;
import com.privatechef.recipe.model.RecipeModel;
import com.privatechef.recipe.model.RecipeParseDto;
import com.privatechef.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

class RecipeServiceTest {
    @Mock
    private RecipeRepository recipeRepository;
    @Mock
    private PreferencesRepository preferencesRepository;
    @Mock
    private ChatGptService chatGptService;
    @Mock
    private ChatGptPromptService chatGptPromptService;

    @InjectMocks
    private RecipeService recipeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void recipeService_getRecipes_returnsRecipes() {
        List<RecipeModel> recipeList = List.of(RecipeModel.builder().title("Test").build());
        Page<RecipeModel> recipesPage = new PageImpl<>(recipeList);
        Pageable pageable = Pageable.unpaged();

        when(recipeRepository.findAllByUserId(eq("user1"), eq(pageable))).thenReturn(recipesPage);

        Page<RecipeModel> result = recipeService.getRecipes("user1", pageable);
        assertSame(recipesPage, result);
        verify(recipeRepository).findAllByUserId(eq("user1"), eq(pageable));
    }

    @Test
    void recipeService_generateRecipe_success() throws Exception {
        String userId = "user1";
        RecipeGenerateRequestDto requestDto = mock(RecipeGenerateRequestDto.class);
        PreferencesModel preferences = mock(PreferencesModel.class);
        ChatGptMessageBody prompt = mock(ChatGptMessageBody.class);
        ChatGptMessageResponse response = mock(ChatGptMessageResponse.class);

        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.of(preferences));
        when(requestDto.getMealType()).thenReturn(MealType.LUNCH);
        when(requestDto.getServings()).thenReturn(2);
        when(requestDto.getInstructions()).thenReturn("instructions");
        when(chatGptPromptService.buildRecipePrompt(MealType.LUNCH, "instructions", 2, preferences)).thenReturn(prompt);
        when(chatGptService.sendMessage(prompt)).thenReturn(response);

        RecipeParseDto parseDto = RecipeParseDto.builder()
                .title("Tacos")
                .image("tacos.jpg")
                .description("Yummy tacos")
                .ingredients(Map.of("Tortilla", "2"))
                .instructions(Set.of("Step 1"))
                .prepTimeMinutes(15)
                .budgetLevel(com.privatechef.preferences.model.BudgetLevel.LOW)
                .cookingSkillLevel(com.privatechef.preferences.model.CookingSkillLevel.BEGINNER)
                .cuisine("Mexican")
                .mealType(MealType.LUNCH)
                .servings(2)
                .build();

        String json = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(parseDto);
        when(response.getFirstOutputText()).thenReturn(json);

        RecipeModel savedModel = RecipeModel.builder().userId(userId).title("Tacos").build();
        when(recipeRepository.save(any(RecipeModel.class))).thenReturn(savedModel);

        RecipeModel result = recipeService.generateRecipe(userId, requestDto);

        assertEquals(savedModel, result);
        verify(recipeRepository).save(any(RecipeModel.class));
    }

    @Test
    void recipeService_generateRecipe_preferencesNotFound_throws() {
        String userId = "user2";
        RecipeGenerateRequestDto requestDto = mock(RecipeGenerateRequestDto.class);
        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThrows(PreferencesModelNotFound.class, () -> recipeService.generateRecipe(userId, requestDto));
    }

    @Test
    void recipeService_generateRecipe_invalidJson_throws() {
        String userId = "user3";
        RecipeGenerateRequestDto requestDto = mock(RecipeGenerateRequestDto.class);
        PreferencesModel preferences = mock(PreferencesModel.class);
        ChatGptMessageBody prompt = mock(ChatGptMessageBody.class);
        ChatGptMessageResponse response = mock(ChatGptMessageResponse.class);

        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.of(preferences));
        when(requestDto.getMealType()).thenReturn(MealType.DINNER);
        when(chatGptPromptService.buildRecipePrompt(MealType.DINNER, "instructions", 1, preferences)).thenReturn(prompt);
        when(chatGptService.sendMessage(prompt)).thenReturn(response);
        when(response.getFirstOutputText()).thenReturn("not a json");

        assertThrows(RuntimeException.class, () -> recipeService.generateRecipe(userId, requestDto));
    }

    @Test
    void recipeService_getRecipe_whenRecipeExists_returnsRecipe() {
        String recipeId = "abc123";
        RecipeModel recipe = RecipeModel.builder().id(recipeId).title("Test").build();
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.of(recipe));

        RecipeModel result = recipeService.getRecipe(recipeId);

        assertEquals(recipe, result);
        verify(recipeRepository).findById(recipeId);
    }

    @Test
    void recipeService_getRecipe_whenRecipeNotFound_throwsException() {
        String recipeId = "notfound";
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.empty());

        assertThrows(RecipeNotFound.class, () -> recipeService.getRecipe(recipeId));
        verify(recipeRepository).findById(recipeId);
    }
}