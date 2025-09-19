package com.privatechef.recipe.repository;

import com.privatechef.recipe.model.RecipeModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<RecipeModel, String> {
    Optional<RecipeModel> findByUserId(String userId);

    Page<RecipeModel> findAllByUserId(String userId, Pageable pageable);

    String id(String id);
}
