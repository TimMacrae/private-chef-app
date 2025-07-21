package com.privatechef.preferences.mapper;

import com.privatechef.preferences.dto.PreferencesDto;
import com.privatechef.preferences.model.PreferencesModel;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PreferencesMapper {

    public PreferencesDto toDto(PreferencesModel model) {
        if (model == null) return null;

        PreferencesDto dto = new PreferencesDto();
        dto.setId(model.getId());
        dto.setUserId(model.getUserId());
        dto.setDietaryRestrictions(model.getDietaryRestrictions());
        dto.setAllergies(model.getAllergies());
        dto.setDislikes(model.getDislikes());
        dto.setLikes(model.getLikes());

        dto.setPreferredCuisines(model.getPreferredCuisines());
        dto.setExcludedCuisines(model.getExcludedCuisines());
        dto.setPreferredChefStyles(model.getPreferredChefStyles());
        dto.setExcludedChefStyles(model.getExcludedChefStyles());

        dto.setSeasonalPreferences(model.getSeasonalPreferences());

        dto.setMaxPrepTimeMinutes(model.getMaxPrepTimeMinutes());
        dto.setBudgetLevel(model.getBudgetLevel());

        dto.setAutoAdaptBasedOnFeedback(model.isAutoAdaptBasedOnFeedback());
        dto.setCookingSkillLevel(model.getCookingSkillLevel());
        dto.setKitchenEquipment(model.getKitchenEquipment());
        dto.setNutritionalGoals(model.getNutritionalGoals());
        return dto;
    }

    public PreferencesModel toModel(PreferencesDto dto, PreferencesModel existingModel) {
        PreferencesModel model = (existingModel != null) ? existingModel : new PreferencesModel();

        if (model.getCreatedAt() == null) {
            model.setCreatedAt(LocalDateTime.now());
        }

        model.setUserId(dto.getUserId());
        model.setDietaryRestrictions(dto.getDietaryRestrictions());
        model.setAllergies(dto.getAllergies());
        model.setDislikes(dto.getDislikes());
        model.setLikes(dto.getLikes());

        model.setPreferredCuisines(dto.getPreferredCuisines());
        model.setExcludedCuisines(dto.getExcludedCuisines());
        model.setPreferredChefStyles(dto.getPreferredChefStyles());
        model.setExcludedChefStyles(dto.getExcludedChefStyles());

        model.setSeasonalPreferences(dto.getSeasonalPreferences());

        model.setMaxPrepTimeMinutes(dto.getMaxPrepTimeMinutes());
        model.setBudgetLevel(dto.getBudgetLevel());

        model.setAutoAdaptBasedOnFeedback(dto.isAutoAdaptBasedOnFeedback());
        model.setCookingSkillLevel(dto.getCookingSkillLevel());
        model.setKitchenEquipment(dto.getKitchenEquipment());
        model.setNutritionalGoals(dto.getNutritionalGoals());


        model.setUpdatedAt(LocalDateTime.now());

        return model;
    }

}

