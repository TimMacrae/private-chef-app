package com.privatechef.collaboration.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CollaboratorModel {
    @Indexed(unique = true)
    String collaboratorId;
    @Indexed(unique = true)
    String collaboratorEmail;
    @Builder.Default
    CollaboratorStatus collaboratorStatus = CollaboratorStatus.PENDING;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
}
