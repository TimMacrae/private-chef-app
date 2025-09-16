package com.privatechef.exception;

public class CollaborationsNotAuthorised extends RuntimeException {
    public CollaborationsNotAuthorised(String id) {
        super("You are not authorized for this collaboration: " + id);
    }
}
