package com.privatechef.recipe;

import com.privatechef.auth.AuthService;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.recipe.model.RecipeGenerateRequestDto;
import com.privatechef.recipe.model.RecipeModel;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping(EndpointsConfig.RECIPES)
public class RecipeController {
    private final RecipeService recipeService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<Set<RecipeModel>> getRecipes(@AuthenticationPrincipal Jwt jwt) {
        Set<RecipeModel> recipes = recipeService.getRecipes(authService.getCurrentUserId(jwt));
        return ResponseEntity.ok(recipes);
    }

    @PostMapping("/generate-recipe")
    public ResponseEntity<RecipeModel> generateRecipe(@AuthenticationPrincipal Jwt jwt, @RequestBody RecipeGenerateRequestDto request) {
        RecipeModel recipe = recipeService.generateRecipe(authService.getCurrentUserId(jwt), request);
        return ResponseEntity.ok(recipe);
    }

}
