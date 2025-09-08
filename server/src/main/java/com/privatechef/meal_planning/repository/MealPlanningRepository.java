package com.privatechef.meal_planning.repository;

import com.privatechef.meal_planning.model.MealPlanningModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealPlanningRepository extends MongoRepository<MealPlanningModel, String> {
    Optional<MealPlanningModel> findByUserId(String userId);
}
