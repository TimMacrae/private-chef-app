package com.privatechef.preferences.dto;

import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;

class SeasonalPreferencesDtoTest {

    @Test
    void preferencesDto_ShouldBeCreatedCorrectly() {
        SeasonalPreferencesDto dto = new SeasonalPreferencesDto();
        boolean summer = false;
        boolean winter = false;
        boolean spring = true;
        boolean autumn = false;
        dto.setSummer(summer);
        dto.setAutumn(autumn);
        dto.setWinter(winter);
        dto.setSpring(spring);

        assertEquals(summer, dto.isSummer());
        assertEquals(autumn, dto.isAutumn());
        assertEquals(winter, dto.isWinter());
        assertEquals(spring, dto.isSpring());
    }
}