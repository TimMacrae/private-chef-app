package com.privatechef.auth;

import com.privatechef.config.RoutesConfig;
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
@RequestMapping(RoutesConfig.API_AUTH)
public class AuthController {
    private final AuthService authService;

    @GetMapping(RoutesConfig.ME)
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {

        Map<String, Object> userInfo = authService.getCurrentUser(jwt);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping(RoutesConfig.ADMIN)
    public ResponseEntity<Map<String, Object>> getCurrentAdminUser(@AuthenticationPrincipal Jwt jwt) {

        Map<String, Object> userAdminInfo = authService.getCurrentAdminUser(jwt);
        return ResponseEntity.ok(userAdminInfo);
    }

}