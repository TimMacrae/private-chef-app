package com.privatechef.meal_planing.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealPlaningDayModel {
    private boolean breakfast = false;
    private boolean lunch = false;
    private boolean dinner = false;
}
