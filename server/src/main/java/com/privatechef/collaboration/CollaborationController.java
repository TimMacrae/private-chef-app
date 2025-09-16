package com.privatechef.collaboration;

import com.privatechef.auth.AuthService;
import com.privatechef.collaboration.model.*;
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

@RestController
@AllArgsConstructor
@RequestMapping(EndpointsConfig.COLLABORATION)
public class CollaborationController {
    private final CollaborationService collaborationService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<CollaborationsUserDto> getCollaborationUser(@AuthenticationPrincipal Jwt jwt) {
        CollaborationsUserDto collaborationUser = collaborationService.getCollaborationUser(authService.getCurrentUserId(jwt));
        return ResponseEntity.ok(collaborationUser);
    }

    @PutMapping("/status")
    public ResponseEntity<CollaborationsModel> updateCollaboratorStatus(@AuthenticationPrincipal Jwt jwt, @RequestBody UpdateStatusRequestDto request) {
        CollaborationsModel collaboration = collaborationService.updateCollaborationStatus(authService.getCurrentUserId(jwt), request.getToken(), request.getStatus());
        return ResponseEntity.ok(collaboration);
    }

    @PostMapping("/invite")
    public ResponseEntity<CollaborationsModel> inviteUserByEmail(@AuthenticationPrincipal Jwt jwt, @RequestBody InviteRequestDto request) {
        CollaborationsModel collaboration = collaborationService.inviteUserByEmail(authService.getCurrentUserId(jwt), request.getEmail());
        return ResponseEntity.ok(collaboration);
    }

    @PostMapping("/receive/{token}")
    public ResponseEntity<Void> addCollaborationToUserReceived(@AuthenticationPrincipal Jwt jwt, @PathVariable String token) {
        collaborationService.addCollaborationIdToCollaborationsUserReceivedByToken(authService.getCurrentUserId(jwt), token);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> removeInvitationAsInviter(@AuthenticationPrincipal Jwt jwt, @RequestBody DeleteRequestDto request) {
        collaborationService.removeInvitationAsInviter(authService.getCurrentUserId(jwt), request.getCollaborationId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/invitee")
    public ResponseEntity<Void> removeCollaborationAsInvitee(@AuthenticationPrincipal Jwt jwt, @RequestBody DeleteRequestDto request) {
        collaborationService.removeCollaborationAsInvitee(authService.getCurrentUserId(jwt), request.getCollaborationId());
        return ResponseEntity.noContent().build();
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

    @ExceptionHandler({IllegalStateException.class, IllegalArgumentException.class})
    public ResponseEntity<ExceptionMessage> handleIllegalArgumentException(
            RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(
                new ExceptionMessage(ex.getMessage(), request.getDescription(false)),
                HttpStatus.BAD_REQUEST);
    }
}
