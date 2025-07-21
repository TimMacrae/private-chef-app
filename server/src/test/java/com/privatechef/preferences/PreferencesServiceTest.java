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

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

//class PreferencesServiceTest {
//
//
//    @InjectMocks
//    private PreferencesService preferencesService;
//
//    @Mock
//    private PreferencesRepository preferencesRepository;
//
//    @Mock
//    private PreferencesMapper preferencesMapper;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//
//    @Test
//    void getUserPreferences_shouldCreateNewModelWithDefaultValues() {
//        String userId = UUID.randomUUID().toString();
//        PreferencesDto dto = new PreferencesDto();
//        dto.setUserId(userId);
//        dto.setAllergies(List.of());
//        dto.setLikes(List.of());
//
//        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.empty());
//        PreferencesModel newModel = new PreferencesModel(userId);
//
//        when(preferencesRepository.save(any(PreferencesModel.class))).thenReturn(newModel);
//        when(preferencesMapper.toDto(any(PreferencesModel.class))).thenReturn(dto);
//
//        PreferencesDto preferencesDto = preferencesService.getUserPreferences(userId);
//        assertEquals(preferencesDto.getUserId(), newModel.getUserId());
//        assertEquals(preferencesDto.getAllergies(), newModel.getAllergies());
//        assertEquals(preferencesDto.getLikes(), newModel.getLikes());
//
//        verify(preferencesRepository, times(1)).findByUserId(userId);
//        verify(preferencesRepository, times(1)).save(any(PreferencesModel.class));
//        verify(preferencesMapper, times(1)).toDto(any(PreferencesModel.class));
//
//    }
//
//    @Test
//    void getUserPreferences_shouldReturnTheUserPreferences() {
//        String userId = UUID.randomUUID().toString();
//        PreferencesModel newModel = new PreferencesModel(userId);
//        newModel.setUserId(userId);
//        newModel.setAllergies(List.of("Nuts"));
//        newModel.setLikes(List.of("Eggs"));
//
//        PreferencesDto dto = new PreferencesDto();
//        dto.setUserId(userId);
//        dto.setAllergies(List.of("Nuts"));
//        dto.setLikes(List.of("Eggs"));
//
//        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.of(newModel));
//        when(preferencesMapper.toDto(any(PreferencesModel.class))).thenReturn(dto);
//
//        PreferencesDto preferencesDto = preferencesService.getUserPreferences(userId);
//        assertEquals(preferencesDto.getUserId(), newModel.getUserId());
//        assertEquals(preferencesDto.getAllergies(), newModel.getAllergies());
//        assertEquals(preferencesDto.getLikes(), newModel.getLikes());
//
//        verify(preferencesRepository, times(1)).findByUserId(userId);
//        verify(preferencesMapper, times(1)).toDto(any(PreferencesModel.class));
//
//    }
//
//    @Test
//    void updateUserPreferences_shouldReturnTheUpdatedUserPreferences() {
//        // Arrange
//        String id = UUID.randomUUID().toString();
//        PreferencesDto requestDto = new PreferencesDto();
//        requestDto.setId(id);
//        requestDto.setAllergies(List.of("milk", "cheese"));
//        requestDto.setLikes(List.of("vegetables"));
//
//        PreferencesModel existingModel = new PreferencesModel(id);
//        existingModel.setId(id);
//        existingModel.setAllergies(List.of("Nuts"));
//        existingModel.setLikes(List.of("Eggs"));
//
//        PreferencesModel updatedModel = new PreferencesModel(id);
//        updatedModel.setId(id);
//        updatedModel.setAllergies(requestDto.getAllergies());
//        updatedModel.setLikes(requestDto.getLikes());
//
//        PreferencesDto expectedDto = new PreferencesDto();
//        expectedDto.setId(id);
//        expectedDto.setAllergies(requestDto.getAllergies());
//        expectedDto.setLikes(requestDto.getLikes());
//
//        when(preferencesRepository.findPreferencesModelById(id)).thenReturn(Optional.of(existingModel));
//        // Simulate in-place update
//        doAnswer(invocation -> {
//            PreferencesDto dtoArg = invocation.getArgument(0);
//            PreferencesModel modelArg = invocation.getArgument(1);
//            modelArg.setAllergies(dtoArg.getAllergies());
//            modelArg.setLikes(dtoArg.getLikes());
//            return null;
//        }).when(preferencesMapper).updateModelFromDto(any(PreferencesDto.class), any(PreferencesModel.class));
//        when(preferencesRepository.save(existingModel)).thenReturn(existingModel);
//        when(preferencesMapper.toDto(existingModel)).thenReturn(expectedDto);
//
//        // Act
//        PreferencesDto result = preferencesService.updateUserPreferences(requestDto);
//
//        // Assert
//        assertEquals(expectedDto.getId(), result.getId());
//        assertEquals(expectedDto.getAllergies(), result.getAllergies());
//        assertEquals(expectedDto.getLikes(), result.getLikes());
//
//        verify(preferencesRepository).findPreferencesModelById(id);
//        verify(preferencesMapper).updateModelFromDto(requestDto, existingModel);
//        verify(preferencesRepository).save(existingModel);
//        verify(preferencesMapper).toDto(existingModel);
//    }
//}

class PreferencesServiceTest {

    private PreferencesRepository preferencesRepository;
    private PreferencesService preferencesService;

    @BeforeEach
    void setUp() {
        preferencesRepository = mock(PreferencesRepository.class);
        PreferencesMapper preferencesMapper = new PreferencesMapper(); // Real mapper
        preferencesService = new PreferencesService(preferencesRepository, preferencesMapper);
    }

    @Test
    void testGetUserPreferences_WhenNotFound_ShouldCreateDefault() {
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
    void testGetUserPreferences_WhenFound_ShouldReturnExisting() {
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
    void testUpdateUserPreferences_WhenFound_ShouldUpdate() {
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
    void testUpdateUserPreferences_WhenNotFound_ShouldThrow() {
        String userId = "unknownUser";
        PreferencesDto updateDto = new PreferencesDto();
        updateDto.setUserId(userId);

        when(preferencesRepository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThrows(PreferencesModelNotFound.class, () -> preferencesService.updateUserPreferences(userId, updateDto));
    }
}