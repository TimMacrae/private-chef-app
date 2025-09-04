package com.privatechef.exception;

public class PreferencesModelNotFound extends RuntimeException {
    public PreferencesModelNotFound(String id) {
        super("PreferencesModel with id " + id + " not found");
    }
}
