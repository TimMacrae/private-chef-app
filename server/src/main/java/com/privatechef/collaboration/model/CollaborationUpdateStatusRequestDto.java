package com.privatechef.collaboration.model;

import lombok.Getter;

@Getter
public class CollaborationUpdateStatusRequestDto {
    String invitorUserId;
    String collaboratorEmail;
    CollaboratorStatus collaboratorStatus;
}
