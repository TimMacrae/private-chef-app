package com.privatechef.meal_planning;


import com.privatechef.auth.AuthService;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.exception.ExceptionMessage;
import com.privatechef.exception.MealPlanningModelNotFound;
import com.privatechef.meal_planning.model.MealPlanningModel;
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
@RequestMapping(EndpointsConfig.MEAL_PLANNING)
public class MealPlanningController {
    private final MealPlanningService mealPlaningService;
    private final AuthService authService;


    @GetMapping
    public ResponseEntity<MealPlanningModel> getMealPlaning(@AuthenticationPrincipal Jwt jwt) {
        MealPlanningModel mealPlaning = mealPlaningService.getMealPlaning(authService.getCurrentUserId(jwt));
        return ResponseEntity.ok(mealPlaning);
    }

    @PutMapping
    public ResponseEntity<MealPlanningModel> updateMealPlaning(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody MealPlanningModel mealPlaningRequest) {
        MealPlanningModel mealPlanning = mealPlaningService.updateMealPlaning(authService.getCurrentUserId(jwt), mealPlaningRequest);
        return ResponseEntity.ok(mealPlanning);
    }

    // controller-level exceptions
    @ExceptionHandler(MealPlanningModelNotFound.class)
    public ResponseEntity<ExceptionMessage> handleMealPlaningModelNotFound(MealPlanningModelNotFound exception, WebRequest request) {
        ExceptionMessage exceptionMessage = new ExceptionMessage(exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionMessage, HttpStatus.NOT_FOUND);
    }
}
