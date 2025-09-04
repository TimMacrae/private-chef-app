package com.privatechef.preferences.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeasonalPreferencesModel {
    private boolean spring = false;
    private boolean summer = false;
    private boolean autumn = false;
    private boolean winter = false;
}
