package com.privatechef.collaboration.repository;

import com.privatechef.collaboration.model.CollaborationsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollaborationsRepository extends MongoRepository<CollaborationsModel, String> {
    Optional<CollaborationsModel> findByToken(String token);
}
