package com.privatechef.preferences.repository;

import com.privatechef.preferences.model.PreferencesModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PreferencesRepository extends MongoRepository<PreferencesModel, String> {
    Optional<PreferencesModel> findByUserId(String userId);
}
