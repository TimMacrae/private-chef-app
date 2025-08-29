package com.privatechef.preferences;

import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.preferences.dto.PreferencesDto;
import com.privatechef.preferences.mapper.PreferencesMapper;
import com.privatechef.preferences.model.BudgetLevel;
import com.privatechef.preferences.model.CookingSkillLevel;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.preferences.repository.PreferencesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


class PreferencesServiceTest {

    @Mock
    private PreferencesRepository preferencesRepository;

    @InjectMocks
    private PreferencesService preferencesService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        PreferencesMapper preferencesMapper = new PreferencesMapper(); // Real mapper
        preferencesService = new PreferencesService(preferencesRepository, preferencesMapper);
    }

    @Test
    void getUserPreferences_WhenNotFound_ShouldCreateDefault() {
        String userId = "user123";

        // Simulate no existing preferences
        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(preferencesRepository.save(any(PreferencesModel.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PreferencesDto result = preferencesService.getUserPreferences(userId);

        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        assertEquals(45, result.getMaxPrepTimeMinutes());
        assertEquals(BudgetLevel.MEDIUM, result.getBudgetLevel());
        verify(preferencesRepository).save(any(PreferencesModel.class));
    }

    @Test
    void getUserPreferences_WhenFound_ShouldReturnExisting() {
        String userId = "user123";
        PreferencesModel existing = PreferencesModel.builder()
                .userId(userId)
                .budgetLevel(BudgetLevel.HIGH)
                .maxPrepTimeMinutes(120)
                .build();

        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.of(existing));

        PreferencesDto result = preferencesService.getUserPreferences(userId);

        assertNotNull(result);
        assertEquals(BudgetLevel.HIGH, result.getBudgetLevel());
        assertEquals(120, result.getMaxPrepTimeMinutes());
        verify(preferencesRepository, never()).save(any(PreferencesModel.class));
    }

    @Test
    void updateUserPreferences_WhenFound_ShouldUpdate() {
        String userId = "user123";
        PreferencesModel existing = PreferencesModel.builder()
                .userId(userId)
                .budgetLevel(BudgetLevel.MEDIUM)
                .cookingSkillLevel(CookingSkillLevel.BEGINNER)
                .maxPrepTimeMinutes(60)
                .createdAt(LocalDateTime.of(2023, 1, 1, 12, 0))
                .build();

        PreferencesDto updateDto = new PreferencesDto();
        updateDto.setUserId(userId);
        updateDto.setBudgetLevel(BudgetLevel.HIGH);
        updateDto.setCookingSkillLevel(CookingSkillLevel.ADVANCED);
        updateDto.setMaxPrepTimeMinutes(120);

        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.of(existing));
        when(preferencesRepository.save(any(PreferencesModel.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PreferencesDto updated = preferencesService.updateUserPreferences(userId, updateDto);

        assertEquals(BudgetLevel.HIGH, updated.getBudgetLevel());
        assertEquals(CookingSkillLevel.ADVANCED, updated.getCookingSkillLevel());
        assertEquals(120, updated.getMaxPrepTimeMinutes());

        // Verify that save() was called with updated values
        ArgumentCaptor<PreferencesModel> captor = ArgumentCaptor.forClass(PreferencesModel.class);
        verify(preferencesRepository).save(captor.capture());
        PreferencesModel savedModel = captor.getValue();
        assertEquals(BudgetLevel.HIGH, savedModel.getBudgetLevel());
        assertNotNull(savedModel.getUpdatedAt());
    }

    @Test
    void updateUserPreferences_WhenNotFound_ShouldThrow() {
        String userId = "unknownUser";
        PreferencesDto updateDto = new PreferencesDto();
        updateDto.setUserId(userId);

        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThrows(PreferencesModelNotFound.class, () -> preferencesService.updateUserPreferences(userId, updateDto));
    }
}