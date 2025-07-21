package com.privatechef.preferences.mapper;

import com.privatechef.preferences.dto.PreferencesDto;
import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import com.privatechef.preferences.model.PreferencesModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PreferencesMapperTest {

    private PreferencesMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new PreferencesMapper();
    }

    @Test
    void testToDto() {
        PreferencesModel model = PreferencesModel.builder()
                .userId("user123")
                .dietaryRestrictions(Arrays.asList("Vegan", "No Sugar"))
                .allergies(List.of("Peanuts"))
                .dislikes(List.of("Broccoli"))
                .likes(List.of("Pizza"))
                .preferredCuisines(List.of("Italian", "Mexican"))
                .excludedCuisines(List.of("French"))
                .preferredChefStyles(List.of("Fine Dining"))
                .excludedChefStyles(List.of("Fast Food"))
                .maxPrepTimeMinutes(60)
                .budgetLevel(BudgetLevel.HIGH)
                .autoAdaptBasedOnFeedback(true)
                .cookingSkillLevel(CookingSkillLevel.ADVANCED)
                .kitchenEquipment(List.of("Oven", "Mixer"))
                .createdAt(LocalDateTime.of(2023, 1, 1, 12, 0))
                .updatedAt(LocalDateTime.of(2023, 1, 2, 12, 0))
                .build();

        PreferencesDto dto = mapper.toDto(model);

        assertNotNull(dto);
        assertEquals("user123", dto.getUserId());
        assertEquals(List.of("Vegan", "No Sugar"), dto.getDietaryRestrictions());
        assertEquals(List.of("Peanuts"), dto.getAllergies());
        assertEquals(60, dto.getMaxPrepTimeMinutes());
        assertEquals(BudgetLevel.HIGH, dto.getBudgetLevel());
        assertTrue(dto.isAutoAdaptBasedOnFeedback());
        assertEquals(CookingSkillLevel.ADVANCED, dto.getCookingSkillLevel());
    }

    @Test
    void testToModelForCreate() {
        PreferencesDto dto = new PreferencesDto();
        dto.setUserId("user123");
        dto.setDietaryRestrictions(List.of("Vegetarian"));
        dto.setAllergies(List.of("Gluten"));
        dto.setLikes(List.of("Pasta"));
        dto.setDislikes(List.of("Fish"));
        dto.setPreferredCuisines(List.of("Italian"));
        dto.setExcludedCuisines(List.of("French"));
        dto.setPreferredChefStyles(List.of("Home Style"));
        dto.setExcludedChefStyles(List.of("Fast Food"));
        dto.setMaxPrepTimeMinutes(90);
        dto.setBudgetLevel(BudgetLevel.LOW);
        dto.setAutoAdaptBasedOnFeedback(true);
        dto.setCookingSkillLevel(CookingSkillLevel.BEGINNER);
        dto.setKitchenEquipment(List.of("Pan", "Knife"));

        PreferencesModel model = mapper.toModel(dto, null);

        assertNotNull(model);
        assertEquals("user123", model.getUserId());
        assertEquals(List.of("Vegetarian"), model.getDietaryRestrictions());
        assertEquals(List.of("Gluten"), model.getAllergies());
        assertEquals(90, model.getMaxPrepTimeMinutes());
        assertEquals(BudgetLevel.LOW, model.getBudgetLevel());
        assertTrue(model.isAutoAdaptBasedOnFeedback());
        assertEquals(CookingSkillLevel.BEGINNER, model.getCookingSkillLevel());
        assertNotNull(model.getCreatedAt());
        assertNotNull(model.getUpdatedAt());
    }

    @Test
    void testToModelForUpdate() {
        PreferencesModel existingModel = PreferencesModel.builder()
                .userId("user123")
                .dietaryRestrictions(List.of("Vegan"))
                .maxPrepTimeMinutes(60)
                .budgetLevel(BudgetLevel.MEDIUM)
                .createdAt(LocalDateTime.of(2023, 1, 1, 12, 0))
                .build();

        PreferencesDto dto = new PreferencesDto();
        dto.setUserId("user123");
        dto.setDietaryRestrictions(List.of("Vegetarian"));
        dto.setMaxPrepTimeMinutes(120);
        dto.setBudgetLevel(BudgetLevel.HIGH);

        PreferencesModel updatedModel = mapper.toModel(dto, existingModel);

        assertNotNull(updatedModel);
        assertEquals("user123", updatedModel.getUserId());
        assertEquals(List.of("Vegetarian"), updatedModel.getDietaryRestrictions());
        assertEquals(120, updatedModel.getMaxPrepTimeMinutes());
        assertEquals(BudgetLevel.HIGH, updatedModel.getBudgetLevel());
        // Ensure createdAt was preserved
        assertEquals(LocalDateTime.of(2023, 1, 1, 12, 0), updatedModel.getCreatedAt());
        assertNotNull(updatedModel.getUpdatedAt());
    }
}