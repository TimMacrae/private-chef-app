package com.privatechef.recipe.repository;

import com.privatechef.recipe.model.RecipeModel;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface RecipeRepository extends MongoRepository<RecipeModel, String> {
    Optional<RecipeModel> findByUserId(String userId);

    Set<RecipeModel> findAllByUserId(String userId, Sort sort);

    String id(String id);
}
