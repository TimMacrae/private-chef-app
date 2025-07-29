package com.privatechef.preferences;


import com.privatechef.auth.AuthService;
import com.privatechef.config.RoutesConfig;
import com.privatechef.exception.ExceptionMessage;
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
    public ResponseEntity<ExceptionMessage> handlePreferencesNotFound(PreferencesModelNotFound ex, WebRequest request) {
        ExceptionMessage exceptionMessage = new ExceptionMessage(ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionMessage, HttpStatus.NOT_FOUND);
    }
}
