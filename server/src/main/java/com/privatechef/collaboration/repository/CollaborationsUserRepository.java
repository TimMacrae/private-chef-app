package com.privatechef.collaboration.repository;

import com.privatechef.collaboration.model.CollaborationsUserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollaborationsUserRepository extends MongoRepository<CollaborationsUserModel, String> {
    Optional<CollaborationsUserModel> findByUserId(String userId);
}
