package com.privatechef.meal_planning;


import com.privatechef.exception.MealPlanningModelNotFound;
import com.privatechef.meal_planning.model.MealPlanningModel;
import com.privatechef.meal_planning.repository.MealPlanningRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MealPlanningService {

    private final MealPlanningRepository mealPlaningRepository;

    public MealPlanningModel getMealPlaning(String userId) {

        return mealPlaningRepository.findByUserId(userId).orElseGet(() -> {
            MealPlanningModel newMealPlanningModel = new MealPlanningModel();
            newMealPlanningModel.setUserId(userId);
            return mealPlaningRepository.save(newMealPlanningModel);
        });
    }

    public MealPlanningModel updateMealPlaning(String userId, MealPlanningModel mealPlaningModel) {
        MealPlanningModel existingMealPlaningModel = mealPlaningRepository.findByUserId(userId).orElseThrow(() -> new MealPlanningModelNotFound(userId));
        existingMealPlaningModel.updateMealPlaningModel(mealPlaningModel);
        return mealPlaningRepository.save(existingMealPlaningModel);
    }
}
