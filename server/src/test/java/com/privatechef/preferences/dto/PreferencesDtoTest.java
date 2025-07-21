package com.privatechef.preferences.dto;

import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import com.privatechef.preferences.model.NutritionalGoalsModel;
import com.privatechef.preferences.model.SeasonalPreferencesModel;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PreferencesDtoTest {

    @Test
    void preferencesDto_ShouldBeCreatedCorrectly() {
        PreferencesDto dto = new PreferencesDto();
        dto.setId("id123");
        dto.setUserId("userId123");
        dto.setDietaryRestrictions(List.of("vegan"));
        dto.setAllergies(List.of("nuts"));
        dto.setDislikes(List.of("onion"));
        dto.setLikes(List.of("pasta"));
        dto.setPreferredCuisines(List.of("Italian"));
        dto.setExcludedCuisines(List.of("French"));
        dto.setPreferredChefStyles(List.of("Modern"));
        dto.setExcludedChefStyles(List.of("Classic"));

        SeasonalPreferencesModel seasonal = new SeasonalPreferencesModel();
        seasonal.setSpring(List.of("Spring"));
        seasonal.setWinter(List.of("Winter"));
        dto.setSeasonalPreferences(seasonal);

        dto.setMaxPrepTimeMinutes(45);
        dto.setBudgetLevel(BudgetLevel.MEDIUM);
        dto.setAutoAdaptBasedOnFeedback(true);
        dto.setCookingSkillLevel(CookingSkillLevel.INTERMEDIATE);
        dto.setKitchenEquipment(List.of("oven"));

        NutritionalGoalsModel goals = new NutritionalGoalsModel();
        goals.setCarbGrams(2000);
        goals.setFatGrams(150);
        goals.setProteinGrams(250);
        goals.setDailyCalories(1400);
        dto.setNutritionalGoals(goals);

//        LocalDateTime now = LocalDateTime.now();
//        dto.setCreatedAt(now);
//        dto.setUpdatedAt(now);

        assertEquals("id123", dto.getId());
        assertEquals("userId123", dto.getUserId());
        assertEquals(List.of("vegan"), dto.getDietaryRestrictions());
        assertEquals(List.of("nuts"), dto.getAllergies());
        assertEquals(List.of("onion"), dto.getDislikes());
        assertEquals(List.of("pasta"), dto.getLikes());
        assertEquals(List.of("Italian"), dto.getPreferredCuisines());
        assertEquals(List.of("French"), dto.getExcludedCuisines());
        assertEquals(List.of("Modern"), dto.getPreferredChefStyles());
        assertEquals(List.of("Classic"), dto.getExcludedChefStyles());
        assertEquals(seasonal, dto.getSeasonalPreferences());
        assertEquals(45, dto.getMaxPrepTimeMinutes());
        assertEquals(BudgetLevel.MEDIUM, dto.getBudgetLevel());
        assertTrue(dto.isAutoAdaptBasedOnFeedback());
        assertEquals(CookingSkillLevel.INTERMEDIATE, dto.getCookingSkillLevel());
        assertEquals(List.of("oven"), dto.getKitchenEquipment());
        assertEquals(goals, dto.getNutritionalGoals());
//        assertEquals(now, dto.getCreatedAt());
//        assertEquals(now, dto.getUpdatedAt());
    }
}