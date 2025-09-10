package com.privatechef.exception;

public class CollaborationsModelNotFound extends RuntimeException {
    public CollaborationsModelNotFound(String id) {
        super("CollaborationsModelNotFound with the id: " + id + " not found");
    }
}
