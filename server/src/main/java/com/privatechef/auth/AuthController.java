package com.privatechef.auth;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.privatechef.config.EndpointsConfig;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(EndpointsConfig.AUTH)
public class AuthController {
    private final AuthService authService;

    @GetMapping(EndpointsConfig.AUTH_ME)
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> userInfo = authService.getCurrentUser(jwt);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping(EndpointsConfig.AUTH_ADMIN)
    public ResponseEntity<Map<String, Object>> getCurrentAdminUser(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> userAdminInfo = authService.getCurrentAdminUser(jwt);
        return ResponseEntity.ok(userAdminInfo);
    }

}