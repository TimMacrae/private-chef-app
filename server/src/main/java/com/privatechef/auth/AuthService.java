package com.privatechef.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Value("${api.roles.namespace}")
    private String ROLES_NAMESPACE;

    public Map<String, Object> getCurrentUser(Jwt jwt) {
        System.out.println("ME: " + jwt.getClaims());
        Map<String, Object> currentUser = new HashMap<>();

        if (jwt.getClaim("sub") != null) {
            currentUser.put("id", jwt.getClaim("sub"));
        }
        return currentUser;
    }

    public Map<String, Object> getCurrentAdminUser(Jwt jwt) {
        System.out.println("ME: " + jwt.getClaims());
        Map<String, Object> currentAdminUser = new HashMap<>();

        if (jwt.getClaim("sub") != null) {
            currentAdminUser.put("id", jwt.getClaim("sub"));
        }

        if (jwt.getClaim(ROLES_NAMESPACE) != null) {
            currentAdminUser.put("roles", jwt.getClaim(ROLES_NAMESPACE));
        }
        return currentAdminUser;
    }
}
