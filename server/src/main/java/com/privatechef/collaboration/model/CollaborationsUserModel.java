package com.privatechef.collaboration.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "collaborations_users")
public class CollaborationsUserModel {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;
    
    @Indexed(unique = true)
    private String email;

    @Builder.Default
    List<String> invitedCollaborations = new ArrayList<>();

    @Builder.Default
    List<String> receivedCollaborations = new ArrayList<>();
}
