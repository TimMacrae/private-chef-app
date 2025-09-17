package com.privatechef.recipe.model;

import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class RecipeParseDtoTest {
    @Test
    void recipeParseDto_testBuilderAndGetters() {
        Map<String, String> ingredients = new HashMap<>();
        ingredients.put("Eggs", "2");
        Set<String> instructions = new LinkedHashSet<>(Arrays.asList("Step 1", "Step 2"));

        RecipeParseDto dto = RecipeParseDto.builder()
                .title("Omelette")
                .image("omelette.jpg")
                .description("A tasty omelette")
                .ingredients(ingredients)
                .instructions(instructions)
                .prepTimeMinutes(10)
                .budgetLevel(BudgetLevel.LOW)
                .cookingSkillLevel(CookingSkillLevel.BEGINNER)
                .cuisine("French")
                .build();

        assertEquals("Omelette", dto.getTitle());
        assertEquals("omelette.jpg", dto.getImage());
        assertEquals("A tasty omelette", dto.getDescription());
        assertEquals(ingredients, dto.getIngredients());
        assertEquals(instructions, dto.getInstructions());
        assertEquals(10, dto.getPrepTimeMinutes());
        assertEquals(BudgetLevel.LOW, dto.getBudgetLevel());
        assertEquals(CookingSkillLevel.BEGINNER, dto.getCookingSkillLevel());
        assertEquals("French", dto.getCuisine());
    }

    @Test
    void recipeParseDto_testNoArgsConstructorAndSetters() {
        RecipeParseDto dto = new RecipeParseDto();
        dto.setTitle("Salad");
        dto.setImage("salad.jpg");
        dto.setDescription("Fresh salad");
        dto.setIngredients(Collections.singletonMap("Lettuce", "1 head"));
        dto.setInstructions(new HashSet<>(Collections.singletonList("Mix ingredients")));
        dto.setPrepTimeMinutes(5);
        dto.setBudgetLevel(BudgetLevel.MEDIUM);
        dto.setCookingSkillLevel(CookingSkillLevel.INTERMEDIATE);
        dto.setCuisine("Mediterranean");

        assertEquals("Salad", dto.getTitle());
        assertEquals("salad.jpg", dto.getImage());
        assertEquals("Fresh salad", dto.getDescription());
        assertEquals(Collections.singletonMap("Lettuce", "1 head"), dto.getIngredients());
        assertEquals(new HashSet<>(Collections.singletonList("Mix ingredients")), dto.getInstructions());
        assertEquals(5, dto.getPrepTimeMinutes());
        assertEquals(BudgetLevel.MEDIUM, dto.getBudgetLevel());
        assertEquals(CookingSkillLevel.INTERMEDIATE, dto.getCookingSkillLevel());
        assertEquals("Mediterranean", dto.getCuisine());
    }
}