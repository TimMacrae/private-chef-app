package com.privatechef.utils.mocks;

import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;

@AllArgsConstructor
@Component
public class MockJwtUtils {
    static String DEFAULT_SUBJECT = "auth0|test-user";
    static String DEFAULT_ROLE_CLAIM = "test_role_claim_namespace";
    static String TOKEN = "test-token";

    public static Jwt createJwt(List<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", DEFAULT_SUBJECT);
        claims.put(DEFAULT_ROLE_CLAIM, roles);
        return Jwt.withTokenValue(TOKEN)
                .header("alg", "none")
                .claims(existingClaims -> existingClaims.putAll(claims))
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600))
                .build();
    }

    public static JwtAuthenticationToken createJwtAuthToken(List<String> roles) {
        Jwt jwt = createJwt(roles);

        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> "ROLE_" + role.toUpperCase())
                .map(SimpleGrantedAuthority::new)
                .toList();

        return new JwtAuthenticationToken(jwt, authorities);
    }

    public static JwtAuthenticationToken createAdminToken() {
        DEFAULT_SUBJECT = "auth0|test-admin-user";
        return createJwtAuthToken(List.of("ADMIN"));
    }

    public static JwtAuthenticationToken createUserToken() {
        DEFAULT_SUBJECT = "auth0|test-user";
        return createJwtAuthToken(List.of("USER"));
    }

    public static JwtAuthenticationToken createEmptyToken() {
        return createJwtAuthToken(Collections.emptyList());
    }
}