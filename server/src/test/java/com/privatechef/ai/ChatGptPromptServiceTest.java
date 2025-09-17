package com.privatechef.ai;

import com.privatechef.ai.dto.ChatGptMessageBody;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.recipe.model.MealTime;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatGptPromptServiceTest {
    @Test
    void chatGptPromptService_buildRecipePrompt_includesMealTimeAndPreferences() {
        ChatGptPromptService service = new ChatGptPromptService();
        MealTime mealTime = MealTime.BREAKFAST;
        PreferencesModel preferences = new PreferencesModel();
        String preferencesString = preferences.toString();

        ChatGptMessageBody result = service.buildRecipePrompt(mealTime, preferences);

        assertNotNull(result);
        String prompt = result.message();
        assertTrue(prompt.contains("MEAL TIME:"));
        assertTrue(prompt.contains(mealTime.toString()));
        assertTrue(prompt.contains("USER PREFERENCES:"));
        assertTrue(prompt.contains(preferencesString));
    }

    @Test
    void chatGptPromptService_buildRecipePrompt_handlesNullPreferences() {
        ChatGptPromptService service = new ChatGptPromptService();
        MealTime mealTime = MealTime.LUNCH;

        ChatGptMessageBody result = service.buildRecipePrompt(mealTime, null);

        assertNotNull(result);
        String prompt = result.message();
        assertTrue(prompt.contains(mealTime.toString()));
        assertTrue(prompt.contains("null"));
    }
}