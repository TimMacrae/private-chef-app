package com.privatechef.preferences.dto;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SeasonalPreferencesDtoTest {

    @Test
    void preferencesDto_ShouldBeCreatedCorrectly() {
        SeasonalPreferencesDto dto = new SeasonalPreferencesDto();
        List<String> summer = new ArrayList<>(List.of("Watermelon"));
        List<String> winter = new ArrayList<>(List.of("Soups"));
        List<String> spring = new ArrayList<>(List.of("Salat"));
        List<String> autumn = new ArrayList<>(List.of("Wild"));
        dto.setSummer(summer);
        dto.setAutumn(autumn);
        dto.setWinter(winter);
        dto.setSpring(spring);

        assertEquals(summer, dto.getSummer());
        assertEquals(autumn, dto.getAutumn());
        assertEquals(winter, dto.getWinter());
        assertEquals(spring, dto.getSpring());
    }
}