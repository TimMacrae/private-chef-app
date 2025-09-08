package com.privatechef.meal_planning.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "meal_planning")
public class MealPlanningModel {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    @Builder.Default
    private boolean active = false;

    @Builder.Default
    private MealPlanningDayModel monday = new MealPlanningDayModel();
    @Builder.Default
    private MealPlanningDayModel tuesday = new MealPlanningDayModel();
    @Builder.Default
    private MealPlanningDayModel wednesday = new MealPlanningDayModel();
    @Builder.Default
    private MealPlanningDayModel thursday = new MealPlanningDayModel();
    @Builder.Default
    private MealPlanningDayModel friday = new MealPlanningDayModel();
    @Builder.Default
    private MealPlanningDayModel saturday = new MealPlanningDayModel();
    @Builder.Default
    private MealPlanningDayModel sunday = new MealPlanningDayModel();
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    public void updateMealPlaningModel(MealPlanningModel mealPlanningModel) {
        this.active = mealPlanningModel.active;
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
