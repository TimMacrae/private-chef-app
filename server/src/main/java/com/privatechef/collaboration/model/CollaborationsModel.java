package com.privatechef.collaboration.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("collaborations")
public class CollaborationsModel {
    @Id
    String id;

    @Indexed()
    String inviterId;

    @Indexed()
    String inviteeId;

    @Indexed()
    String inviteeEmail;

    @Builder.Default
    CollaborationsStatus status = CollaborationsStatus.PENDING;

    String token;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
}
