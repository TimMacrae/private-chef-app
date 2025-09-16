package com.privatechef.collaboration.model;

import lombok.Data;

@Data
public class UpdateStatusRequestDto {
    private String token;
    private CollaborationsStatus status;
}
