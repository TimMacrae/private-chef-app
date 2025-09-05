package com.privatechef.meal_planing.repository;

import com.privatechef.meal_planing.model.MealPlanningModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealPlaningRepository extends MongoRepository<MealPlanningModel, String> {
    Optional<MealPlanningModel> findByUserId(String userId);
}
