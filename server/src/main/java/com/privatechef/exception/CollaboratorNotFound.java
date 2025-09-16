package com.privatechef.exception;

public class CollaboratorNotFound extends RuntimeException {
    public CollaboratorNotFound(String email) {
        super("Collaborator not found with email: " + email);
    }
}
