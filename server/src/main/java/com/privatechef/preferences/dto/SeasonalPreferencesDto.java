package com.privatechef.preferences.dto;

import lombok.Data;

@Data
public class SeasonalPreferencesDto {
    private boolean spring = false;
    private boolean summer = false;
    private boolean autumn = false;
    private boolean winter = false;
}