package com.privatechef.preferences.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SeasonalPreferencesModel {

    private List<@NotBlank String> spring = new ArrayList<>();
    private List<@NotBlank String> summer = new ArrayList<>();
    private List<@NotBlank String> autumn = new ArrayList<>();
    private List<@NotBlank String> winter = new ArrayList<>();

}
