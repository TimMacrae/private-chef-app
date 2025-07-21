package com.privatechef.preferences.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SeasonalPreferencesDto {
    private List<@NotBlank String> spring = new ArrayList<>();
    private List<@NotBlank String> summer = new ArrayList<>();
    private List<@NotBlank String> autumn = new ArrayList<>();
    private List<@NotBlank String> winter = new ArrayList<>();
}