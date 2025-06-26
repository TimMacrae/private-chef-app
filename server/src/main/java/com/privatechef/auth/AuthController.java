package com.privatechef.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Value("${api.roles.namespace}")
    private String ROLES_NAMESPACE;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        System.out.println("ME: " + jwt.getClaims());
        Map<String, Object> userInfo = new HashMap<>();

        if (jwt.getClaim("sub") != null) {
            userInfo.put("id", jwt.getClaim("sub"));
        }

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getCurrentAdminUser(@AuthenticationPrincipal Jwt jwt) {
        System.out.println("ME: " + jwt.getClaims());
        Map<String, Object> userInfo = new HashMap<>();

        if (jwt.getClaim("sub") != null) {
            userInfo.put("id", jwt.getClaim("sub"));
        }

        if (jwt.getClaim(ROLES_NAMESPACE) != null) {
            userInfo.put("roles", jwt.getClaim(ROLES_NAMESPACE));
        }

        return ResponseEntity.ok(userInfo);
    }

}