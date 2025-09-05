package com.privatechef.meal_planing;


import com.privatechef.exception.MealPlaningModelNotFound;
import com.privatechef.meal_planing.model.MealPlanningModel;
import com.privatechef.meal_planing.repository.MealPlaningRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MealPlaningService {

    private final MealPlaningRepository mealPlaningRepository;

    public MealPlanningModel getMealPlaning(String userId) {

        return mealPlaningRepository.findByUserId(userId).orElseGet(() -> {
            MealPlanningModel newMealPlanningModel = new MealPlanningModel();
            newMealPlanningModel.setUserId(userId);
            return mealPlaningRepository.save(newMealPlanningModel);
        });
    }

    public MealPlanningModel updateMealPlaning(String userId, MealPlanningModel mealPlaningModel) {
        MealPlanningModel existingMealPlaningModel = mealPlaningRepository.findByUserId(userId).orElseThrow(() -> new MealPlaningModelNotFound(userId));
        existingMealPlaningModel.updateMealPlaningModel(mealPlaningModel);
        return mealPlaningRepository.save(existingMealPlaningModel);
    }
}
