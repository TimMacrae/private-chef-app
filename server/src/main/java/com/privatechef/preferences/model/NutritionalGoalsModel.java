package com.privatechef.preferences.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class NutritionalGoalsModel {
    @Min(500)
    @Max(10000)
    private Integer dailyCalories;

    @Min(0)
    private Integer proteinGrams;

    @Min(0)
    private Integer carbGrams;

    @Min(0)
    private Integer fatGrams;
}
