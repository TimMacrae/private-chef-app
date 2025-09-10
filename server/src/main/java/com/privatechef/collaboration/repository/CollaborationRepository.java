package com.privatechef.collaboration.repository;

import com.privatechef.collaboration.model.CollaborationModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollaborationRepository extends MongoRepository<CollaborationModel, String> {
    Optional<CollaborationModel> findByUserId(String userId);
}
