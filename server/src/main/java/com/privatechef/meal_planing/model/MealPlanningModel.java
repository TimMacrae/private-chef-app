package com.privatechef.meal_planing.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "meal_planing")
public class MealPlanningModel {
    @Id
    private String id;

    @Value("userId")
    @Indexed(unique = true)
    private String userId;

    @Builder.Default
    private MealPlaningDayModel monday = new MealPlaningDayModel();
    @Builder.Default
    private MealPlaningDayModel tuesday = new MealPlaningDayModel();
    @Builder.Default
    private MealPlaningDayModel wednesday = new MealPlaningDayModel();
    @Builder.Default
    private MealPlaningDayModel thursday = new MealPlaningDayModel();
    @Builder.Default
    private MealPlaningDayModel friday = new MealPlaningDayModel();
    @Builder.Default
    private MealPlaningDayModel saturday = new MealPlaningDayModel();
    @Builder.Default
    private MealPlaningDayModel sunday = new MealPlaningDayModel();
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    public void updateMealPlaningModel(MealPlanningModel mealPlanningModel) {
        this.monday = mealPlanningModel.monday;
        this.tuesday = mealPlanningModel.tuesday;
        this.wednesday = mealPlanningModel.wednesday;
        this.thursday = mealPlanningModel.thursday;
        this.friday = mealPlanningModel.friday;
        this.saturday = mealPlanningModel.saturday;
        this.sunday = mealPlanningModel.sunday;
        this.updatedAt = LocalDateTime.now();
    }
}
