package com.privatechef.ai;

import com.privatechef.ai.dto.ChatGptMessageBody;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.recipe.model.MealType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatGptPromptServiceTest {
    @Test
    void chatGptPromptService_buildRecipePrompt_includesMealTimeAndPreferences() {
        ChatGptPromptService service = new ChatGptPromptService();
        MealType mealType = MealType.BREAKFAST;
        String instructions = "instructions";
        int servings = 2;
        PreferencesModel preferences = new PreferencesModel();
        String preferencesString = preferences.toString();

        ChatGptMessageBody result = service.buildRecipePrompt(mealType, instructions, servings, preferences);

        assertNotNull(result);
        String prompt = result.message();
        assertTrue(prompt.contains("MEAL TYPE:"));
        assertTrue(prompt.contains(mealType.toString()));

        assertTrue(prompt.contains(instructions));

        assertTrue(prompt.contains(String.valueOf(servings)));

        assertTrue(prompt.contains("USER PREFERENCES:"));
        assertTrue(prompt.contains(preferencesString));
    }

    @Test
    void chatGptPromptService_buildRecipePrompt_handlesNullPreferences() {
        ChatGptPromptService service = new ChatGptPromptService();
        MealType mealType = MealType.LUNCH;
        String instructions = "instructions";
        int servings = 2;

        ChatGptMessageBody result = service.buildRecipePrompt(mealType, instructions, servings, null);

        assertNotNull(result);
        String prompt = result.message();
        assertTrue(prompt.contains(mealType.toString()));
        assertTrue(prompt.contains("null"));
    }
}