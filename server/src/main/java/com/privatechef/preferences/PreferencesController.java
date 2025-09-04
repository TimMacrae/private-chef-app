package com.privatechef.preferences;


import com.privatechef.auth.AuthService;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.exception.ExceptionMessage;
import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.preferences.model.PreferencesModel;
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
@RequestMapping(EndpointsConfig.PREFERENCES)
public class PreferencesController {
    private final PreferencesService preferencesService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<PreferencesModel> getUserPreferences(@AuthenticationPrincipal Jwt jwt) {
        PreferencesModel userPreferences = preferencesService.getUserPreferences(authService.getCurrentUserId(jwt));
        return ResponseEntity.ok(userPreferences);
    }

    @PutMapping
    public ResponseEntity<PreferencesModel> updateUserPreferences(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody PreferencesModel userPreferences) {
        PreferencesModel updatedUserPreferences = preferencesService.updateUserPreferences(authService.getCurrentUserId(jwt), userPreferences);
        return ResponseEntity.ok(updatedUserPreferences);
    }

    // controller-level exceptions
    @ExceptionHandler(PreferencesModelNotFound.class)
    public ResponseEntity<ExceptionMessage> handlePreferencesNotFound(PreferencesModelNotFound exception, WebRequest request) {
        ExceptionMessage exceptionMessage = new ExceptionMessage(exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionMessage, HttpStatus.NOT_FOUND);
    }
}
