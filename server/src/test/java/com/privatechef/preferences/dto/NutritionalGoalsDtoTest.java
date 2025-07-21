package com.privatechef.preferences.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NutritionalGoalsDtoTest {
    @Test
    void nutritionalGoalsDto_ShouldBeCreatedCorrectly() {
        NutritionalGoalsDto dto = new NutritionalGoalsDto();
        dto.setCarbGrams(2000);
        dto.setFatGrams(150);
        dto.setProteinGrams(250);
        dto.setDailyCalories(700);

        assertEquals(2000, dto.getCarbGrams());
        assertEquals(150, dto.getFatGrams());
        assertEquals(250, dto.getProteinGrams());
        assertEquals(700, dto.getDailyCalories());
    }

}