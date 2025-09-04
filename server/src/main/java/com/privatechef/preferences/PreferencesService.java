package com.privatechef.preferences;

import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.preferences.repository.PreferencesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class PreferencesService {

    private final PreferencesRepository preferencesRepository;

    public PreferencesModel getUserPreferences(String userId) {
        return preferencesRepository.findByUserId(userId)
                .orElseGet(() -> {
                    PreferencesModel newPreferences = new PreferencesModel();
                    newPreferences.setUserId(userId);
                    newPreferences.setCreatedAt(LocalDateTime.now());
                    return preferencesRepository.save(newPreferences);
                });
    }

    public PreferencesModel updateUserPreferences(String userId, PreferencesModel userPreferencesRequest) {
        PreferencesModel existingModel = preferencesRepository.findByUserId(userId).orElseThrow(() -> new PreferencesModelNotFound(userId));
        existingModel.updatePreferencesModel(userPreferencesRequest);

        return preferencesRepository.save(existingModel);
    }
}