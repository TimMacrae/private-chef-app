package com.privatechef.meal_planning.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealPlanningDayModel {
    private boolean breakfast = false;
    private boolean lunch = false;
    private boolean dinner = false;
}
