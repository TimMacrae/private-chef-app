package com.privatechef.recipe;

import com.privatechef.auth.AuthService;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.exception.ExceptionMessage;
import com.privatechef.exception.RecipeNotFound;
import com.privatechef.recipe.model.RecipeGenerateRequestDto;
import com.privatechef.recipe.model.RecipeModel;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Set;


@RestController
@AllArgsConstructor
@RequestMapping(EndpointsConfig.RECIPES)
public class RecipeController {
    private final RecipeService recipeService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<PagedModel<RecipeModel>> getRecipes(
            @AuthenticationPrincipal Jwt jwt,
            Pageable pageable) {
        Page<RecipeModel> recipes = recipeService.getRecipes(authService.getCurrentUserId(jwt), pageable);
        return ResponseEntity.ok(new PagedModel<>(recipes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeModel> getRecipe(@AuthenticationPrincipal Jwt jwt, @PathVariable String id) {
        authService.getCurrentUserId(jwt);
        RecipeModel recipe = recipeService.getRecipe(id);
        return ResponseEntity.ok(recipe);
    }

    @PostMapping(EndpointsConfig.RECIPE_GENERATION)
    public ResponseEntity<RecipeModel> generateRecipe(@AuthenticationPrincipal Jwt jwt, @RequestBody RecipeGenerateRequestDto request) {
        RecipeModel recipe = recipeService.generateRecipe(authService.getCurrentUserId(jwt), request);
        return ResponseEntity.ok(recipe);
    }

    // controller-level exceptions
    @ExceptionHandler(RecipeNotFound.class)
    public ResponseEntity<ExceptionMessage> handleRecipeNotFound(RecipeNotFound exception, WebRequest request) {
        ExceptionMessage exceptionMessage = new ExceptionMessage(exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionMessage, HttpStatus.NOT_FOUND);
    }

}
