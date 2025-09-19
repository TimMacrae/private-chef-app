package com.privatechef.recipe;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.privatechef.ai.ChatGptPromptService;
import com.privatechef.ai.ChatGptService;
import com.privatechef.ai.dto.ChatGptMessageBody;
import com.privatechef.ai.dto.ChatGptMessageResponse;
import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.exception.RecipeNotFound;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.preferences.repository.PreferencesRepository;
import com.privatechef.recipe.model.RecipeGenerateRequestDto;
import com.privatechef.recipe.model.RecipeModel;
import com.privatechef.recipe.model.RecipeParseDto;
import com.privatechef.recipe.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@AllArgsConstructor
public class RecipeService {
    private RecipeRepository recipeRepository;
    private PreferencesRepository preferencesRepository;
    private ChatGptService chatGptService;
    private ChatGptPromptService chatGptPromptService;


    public Set<RecipeModel> getRecipes(String userId) {
        return recipeRepository.findAllByUserId(userId, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public RecipeModel getRecipe(String recipeId) {
        return recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFound(recipeId));
    }


    public RecipeModel generateRecipe(String userId, RecipeGenerateRequestDto requestDto) {
        PreferencesModel userPreferences = preferencesRepository.findByUserId(userId).orElseThrow(() -> new PreferencesModelNotFound(userId));
        ChatGptMessageBody recipePrompt = chatGptPromptService.buildRecipePrompt(requestDto.getMealType(), requestDto.getInstructions(), requestDto.getServings(), userPreferences);

        ChatGptMessageResponse chatGptMessageResponse = chatGptService.sendMessage(recipePrompt);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            RecipeParseDto recipeParseDto = objectMapper.readValue(chatGptMessageResponse.getFirstOutputText(), RecipeParseDto.class);
            RecipeModel recipeModel = RecipeModel.builder()
                    .userId(userId)
                    .title(recipeParseDto.getTitle())
                    .image(recipeParseDto.getImage())
                    .description(recipeParseDto.getDescription())
                    .ingredients(recipeParseDto.getIngredients())
                    .instructions(recipeParseDto.getInstructions())
                    .budgetLevel(recipeParseDto.getBudgetLevel())
                    .cookingSkillLevel(recipeParseDto.getCookingSkillLevel())
                    .cuisine(recipeParseDto.getCuisine())
                    .prepTimeMinutes(recipeParseDto.getPrepTimeMinutes())
                    .mealType(recipeParseDto.getMealType())
                    .servings(recipeParseDto.getServings())
                    .createdAt(LocalDateTime.now())
                    .build();
            return recipeRepository.save(recipeModel);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse recipe from response", e);
        }
    }
}
