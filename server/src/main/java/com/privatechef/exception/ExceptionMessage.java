package com.privatechef.exception;

import java.time.LocalDateTime;

public record ExceptionMessage(String message, String path, LocalDateTime timestamp) {
    public ExceptionMessage(String message, String path) {
        this(message, path, LocalDateTime.now());
    }

    public ExceptionMessage(String message) {
        this(message, "", LocalDateTime.now());
    }
}
