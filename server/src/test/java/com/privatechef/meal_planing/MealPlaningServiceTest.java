package com.privatechef.meal_planing;

import com.privatechef.exception.MealPlaningModelNotFound;
import com.privatechef.meal_planing.model.MealPlaningDayModel;
import com.privatechef.meal_planing.model.MealPlanningModel;
import com.privatechef.meal_planing.repository.MealPlaningRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

class MealPlaningServiceTest {
    @Mock
    private MealPlaningRepository mealPlaningRepository;

    @InjectMocks
    private MealPlaningService mealPlaningService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mealPlaningService = new MealPlaningService(mealPlaningRepository);
    }

    @Test
    void getMealPlaning_WhenNotFound_ShouldCreateDefault() {
        String userId = "user123";
        MealPlaningDayModel monday = new MealPlaningDayModel();
        when(mealPlaningRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(mealPlaningRepository.save(any(MealPlanningModel.class))).thenAnswer(invocation -> invocation.getArgument(0));

        MealPlanningModel result = mealPlaningService.getMealPlaning(userId);

        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        assertEquals(monday, result.getMonday());
        verify(mealPlaningRepository).save(any(MealPlanningModel.class));
    }

    @Test
    void getMealPlaning_WhenFound_ShouldReturnExisting() {
        String userId = "user123";
        MealPlanningModel existing = MealPlanningModel.builder()
                .userId(userId)
                .build();

        when(mealPlaningRepository.findByUserId(userId)).thenReturn(Optional.of(existing));

        MealPlanningModel result = mealPlaningService.getMealPlaning(userId);

        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        verify(mealPlaningRepository, never()).save(any(MealPlanningModel.class));
    }

    @Test
    void updateMealPlaning_WhenFound_ShouldUpdate() {
        String userId = "user123";
        MealPlanningModel existing = MealPlanningModel.builder()
                .userId(userId)
                .build();

        MealPlanningModel updateDto = new MealPlanningModel();
        MealPlaningDayModel friday = new MealPlaningDayModel(true, true, true);
        updateDto.setUserId(userId);
        updateDto.setFriday(friday);

        when(mealPlaningRepository.findByUserId(userId)).thenReturn(Optional.of(existing));
        when(mealPlaningRepository.save(any(MealPlanningModel.class))).thenAnswer(invocation -> invocation.getArgument(0));

        MealPlanningModel updated = mealPlaningService.updateMealPlaning(userId, updateDto);
        assertEquals(userId, updated.getUserId());
        assertEquals(friday, updated.getFriday());

        ArgumentCaptor<MealPlanningModel> captor = ArgumentCaptor.forClass(MealPlanningModel.class);
        verify(mealPlaningRepository).save(captor.capture());
        MealPlanningModel savedModel = captor.getValue();
        assertEquals(userId, savedModel.getUserId());
    }

    @Test
    void updateMealPlaning_WhenNotFound_ShouldThrowException() {
        String userId = "unknownUser";
        MealPlanningModel updateDto = new MealPlanningModel();
        updateDto.setUserId(userId);

        when(mealPlaningRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThrows(MealPlaningModelNotFound.class, () -> mealPlaningService.updateMealPlaning(userId, updateDto));
    }
}