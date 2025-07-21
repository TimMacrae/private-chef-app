package com.privatechef.preferences;


import com.privatechef.auth.AuthService;
import com.privatechef.config.RoutesConfig;
import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.preferences.dto.PreferencesDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping(RoutesConfig.API_PREFERENCES)
public class PreferencesController {
    private final PreferencesService preferencesService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<PreferencesDto> getUserPreferences(@AuthenticationPrincipal Jwt jwt) {
        PreferencesDto userPreferences = preferencesService.getUserPreferences(authService.getCurrentUserId(jwt));
        return ResponseEntity.ok(userPreferences);
    }

    @PutMapping
    public ResponseEntity<PreferencesDto> updateUserPreferences(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody PreferencesDto userPreferences) {
        PreferencesDto updatedUserPreferences = preferencesService.updateUserPreferences(authService.getCurrentUserId(jwt), userPreferences);
        return ResponseEntity.ok(updatedUserPreferences);
    }

    // Controller-level exception handler
    @ExceptionHandler(PreferencesModelNotFound.class)
    public ResponseEntity<Map<String, String>> handlePreferencesNotFound(PreferencesModelNotFound ex, WebRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("message", ex.getMessage());
        response.put("timestamp", String.valueOf(LocalDateTime.now()));
        response.put("path", request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
