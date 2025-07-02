package com.privatechef.auth;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {

        Map<String, Object> userInfo = authService.getCurrentUser(jwt);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getCurrentAdminUser(@AuthenticationPrincipal Jwt jwt) {

        Map<String, Object> userAdminInfo = authService.getCurrentAdminUser(jwt);
        return ResponseEntity.ok(userAdminInfo);
    }

}