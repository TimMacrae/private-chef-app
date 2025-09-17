package com.privatechef.recipe.model;

import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class RecipeModelTest {
    @Test
    void recipeModel_testBuilderAndGetters() {
        Map<String, String> ingredients = new HashMap<>();
        ingredients.put("Eggs", "2");
        Set<String> instructions = new LinkedHashSet<>(Arrays.asList("Step 1", "Step 2"));
        LocalDateTime now = LocalDateTime.now();

        RecipeModel recipe = RecipeModel.builder()
                .id("1")
                .userId("user123")
                .title("Omelette")
                .image("omelette.jpg")
                .description("A tasty omelette")
                .ingredients(ingredients)
                .instructions(instructions)
                .prepTimeMinutes(10)
                .budgetLevel(BudgetLevel.LOW)
                .cookingSkillLevel(CookingSkillLevel.BEGINNER)
                .cuisine("French")
                .createdAt(now)
                .build();

        assertEquals("1", recipe.getId());
        assertEquals("user123", recipe.getUserId());
        assertEquals("Omelette", recipe.getTitle());
        assertEquals("omelette.jpg", recipe.getImage());
        assertEquals("A tasty omelette", recipe.getDescription());
        assertEquals(ingredients, recipe.getIngredients());
        assertEquals(instructions, recipe.getInstructions());
        assertEquals(10, recipe.getPrepTimeMinutes());
        assertEquals(BudgetLevel.LOW, recipe.getBudgetLevel());
        assertEquals(CookingSkillLevel.BEGINNER, recipe.getCookingSkillLevel());
        assertEquals("French", recipe.getCuisine());
        assertEquals(now, recipe.getCreatedAt());
    }

    @Test
    void recipeModel_testNoArgsConstructorAndSetters() {
        RecipeModel recipe = new RecipeModel();
        recipe.setId("2");
        recipe.setUserId("user456");
        recipe.setTitle("Salad");
        recipe.setImage("salad.jpg");
        recipe.setDescription("Fresh salad");
        recipe.setIngredients(Collections.singletonMap("Lettuce", "1 head"));
        recipe.setInstructions(new HashSet<>(Collections.singletonList("Mix ingredients")));
        recipe.setPrepTimeMinutes(5);
        recipe.setBudgetLevel(BudgetLevel.MEDIUM);
        recipe.setCookingSkillLevel(CookingSkillLevel.INTERMEDIATE);
        recipe.setCuisine("Mediterranean");
        LocalDateTime now = LocalDateTime.now();
        recipe.setCreatedAt(now);

        assertEquals("2", recipe.getId());
        assertEquals("user456", recipe.getUserId());
        assertEquals("Salad", recipe.getTitle());
        assertEquals("salad.jpg", recipe.getImage());
        assertEquals("Fresh salad", recipe.getDescription());
        assertEquals(Collections.singletonMap("Lettuce", "1 head"), recipe.getIngredients());
        assertEquals(new HashSet<>(Collections.singletonList("Mix ingredients")), recipe.getInstructions());
        assertEquals(5, recipe.getPrepTimeMinutes());
        assertEquals(BudgetLevel.MEDIUM, recipe.getBudgetLevel());
        assertEquals(CookingSkillLevel.INTERMEDIATE, recipe.getCookingSkillLevel());
        assertEquals("Mediterranean", recipe.getCuisine());
        assertEquals(now, recipe.getCreatedAt());
    }
}