package com.privatechef.collaboration.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class CollaborationsUserDto {
    private String id;
    private String userId;
    private String email;

    List<CollaborationsModel> invitedCollaborations;
    List<CollaborationsModel> receivedCollaborations;
}
