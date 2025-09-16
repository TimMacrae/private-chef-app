package com.privatechef.exception;

public class CollaborationsModelNotFound extends RuntimeException {
    public CollaborationsModelNotFound(String id) {
        super("Collaboration not found with the id: " + id);
    }
}
