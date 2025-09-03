package com.privatechef.preferences.model;

import lombok.Data;

@Data
public class SeasonalPreferencesModel {
    private boolean spring = false;
    private boolean summer = false;
    private boolean autumn = false;
    private boolean winter = false;
}
