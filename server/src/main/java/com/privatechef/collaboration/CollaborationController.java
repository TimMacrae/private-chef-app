package com.privatechef.collaboration;

import com.privatechef.auth.AuthService;
import com.privatechef.collaboration.model.CollaborationModel;
import com.privatechef.collaboration.model.CollaborationRequestDto;
import com.privatechef.collaboration.model.CollaborationUpdateStatusRequestDto;
import com.privatechef.collaboration.model.CollaboratorModel;
import com.privatechef.config.EndpointsConfig;
import com.privatechef.exception.CollaborationsModelNotFound;
import com.privatechef.exception.CollaboratorAlreadyExists;
import com.privatechef.exception.ExceptionMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(EndpointsConfig.COLLABORATION)
public class CollaborationController {
    private final CollaborationService collaborationService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<CollaborationModel> getCollaboration(@AuthenticationPrincipal Jwt jwt) {
        CollaborationModel collaboration = collaborationService.getCollaboration(authService.getCurrentUserId(jwt));
        return ResponseEntity.ok(collaboration);
    }

    @PostMapping
    public ResponseEntity<CollaborationModel> addCollaborator(@AuthenticationPrincipal Jwt jwt, @RequestBody CollaborationRequestDto email) {
        CollaborationModel collaboration = collaborationService.addCollaborator(authService.getCurrentUserId(jwt), email.getEmail());
        return ResponseEntity.ok(collaboration);
    }

    @PutMapping
    public ResponseEntity<CollaboratorModel> updateCollaboratorStatus(@AuthenticationPrincipal Jwt jwt, @RequestBody CollaborationUpdateStatusRequestDto request) {
        CollaboratorModel collaborator = collaborationService.updateCollaboratorStatus(authService.getCurrentUserId(jwt), request);
        return ResponseEntity.ok(collaborator);
    }

    // controller-level exceptions
    @ExceptionHandler(CollaborationsModelNotFound.class)
    public ResponseEntity<ExceptionMessage> handleCollaborationsModelNotFound(CollaborationsModelNotFound exception, WebRequest request) {
        ExceptionMessage exceptionMessage = new ExceptionMessage(exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CollaboratorAlreadyExists.class)
    public ResponseEntity<ExceptionMessage> handleCollaboratorAlreadyExists(CollaboratorAlreadyExists exception, WebRequest request) {
        ExceptionMessage exceptionMessage = new ExceptionMessage(exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionMessage, HttpStatus.CONFLICT);
    }

}
