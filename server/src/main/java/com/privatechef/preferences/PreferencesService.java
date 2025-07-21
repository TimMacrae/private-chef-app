package com.privatechef.preferences;

import com.privatechef.exception.PreferencesModelNotFound;
import com.privatechef.preferences.dto.PreferencesDto;
import com.privatechef.preferences.mapper.PreferencesMapper;
import com.privatechef.preferences.model.PreferencesModel;
import com.privatechef.preferences.repository.PreferencesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

//@Service
//@AllArgsConstructor
//public class PreferencesService {
//
//    private final PreferencesRepository preferencesRepository;
//    private final PreferencesMapper preferencesMapper;
//
//    PreferencesDto getUserPreferences(String userId) {
//        Optional<PreferencesModel> userPreferences = preferencesRepository.findByUserId(userId);
//
//        if (userPreferences.isPresent()) {
//            return preferencesMapper.toDto(userPreferences.get());
//        }
//
//        PreferencesModel newUserPreferences = new PreferencesModel(userId);
//        preferencesRepository.save(newUserPreferences);
//
//        return preferencesMapper.toDto(newUserPreferences);
//    }
//
//    PreferencesDto updateUserPreferences(@NotNull PreferencesDto userPreferencesRequest) {
//        PreferencesModel userPreferencesModel = preferencesRepository.findPreferencesModelById(userPreferencesRequest.getId())
//                .orElseThrow(() -> new PreferencesModelNotFound(userPreferencesRequest.getId()));
//
//        System.out.println("userPreferencesRequest: " + userPreferencesRequest);
//        System.out.println("userPreferencesModel: " + userPreferencesModel);
//
//        preferencesMapper.updateModelFromDto(userPreferencesRequest, userPreferencesModel);
//
//        PreferencesModel updatedModel = preferencesRepository.save(userPreferencesModel);
//        System.out.println("updatedModel: " + updatedModel);
//        return preferencesMapper.toDto(updatedModel);
//    }
//}


@Service
@AllArgsConstructor
public class PreferencesService {

    private final PreferencesRepository preferencesRepository;
    private final PreferencesMapper preferencesMapper;


    public PreferencesDto getUserPreferences(String userId) {
        PreferencesModel userPreferences = preferencesRepository.findByUserId(userId)
                .orElseGet(() -> {
                    PreferencesModel newPreferences = new PreferencesModel();
                    newPreferences.setUserId(userId);
                    newPreferences.setCreatedAt(LocalDateTime.now());
                    return preferencesRepository.save(newPreferences);
                });

        return preferencesMapper.toDto(userPreferences);
    }

    public PreferencesDto updateUserPreferences(String userId, PreferencesDto userPreferencesRequest) {
        PreferencesModel existingModel = preferencesRepository.findByUserId(userId).orElseThrow(() -> new PreferencesModelNotFound(userId));

        PreferencesModel updatedModel = preferencesMapper.toModel(userPreferencesRequest, existingModel);
        updatedModel.setUserId(userId);
        updatedModel.setUpdatedAt(LocalDateTime.now());

        PreferencesModel savedModel = preferencesRepository.save(updatedModel);
        return preferencesMapper.toDto(savedModel);
    }
}