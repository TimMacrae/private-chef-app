package com.privatechef.exception;

public class CollaboratorAlreadyExists extends RuntimeException {
    public CollaboratorAlreadyExists(String email) {
        super("Collaborator with the email: " + email + " already exists");
    }
}
