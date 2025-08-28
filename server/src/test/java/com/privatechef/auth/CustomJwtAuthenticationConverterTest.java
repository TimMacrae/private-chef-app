package com.privatechef.auth;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class CustomJwtAuthenticationConverterTest {

    private final String ROLE_CLAIM_NAMESPACE = "https://example-api/roles";

    private final CustomJwtAuthenticationConverter converter = new CustomJwtAuthenticationConverter(ROLE_CLAIM_NAMESPACE);

    @Test
    void convert_shouldReturnGrantedAuthoritiesWhenRolesArePresent() {
        List<String> roles = List.of("admin", "user");

        Jwt jwt = buildJwtWithRoles(roles);
        Collection<GrantedAuthority> authorities = converter.convert(jwt);

        assertNotNull(authorities);
        assertEquals(2, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN")));
        assertTrue(authorities.contains(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Test
    void convert_shouldReturnEmptyListWhenRolesClaimIsMissing() {
        Jwt jwt = buildJwtWithRoles(null); // No roles claim
        Collection<GrantedAuthority> authorities = converter.convert(jwt);

        assertNotNull(authorities);
        assertTrue(authorities.isEmpty());
    }

    @Test
    void convert_shouldReturnEmptyListWhenRolesClaimIsEmpty() {
        Jwt jwt = buildJwtWithRoles(Collections.emptyList());
        Collection<GrantedAuthority> authorities = converter.convert(jwt);

        assertNotNull(authorities);
        assertTrue(authorities.isEmpty());
    }

    private Jwt buildJwtWithRoles(List<String> roles) {
        Map<String, Object> claims = new HashMap<>();


        if (roles != null) {
            claims.put(ROLE_CLAIM_NAMESPACE, roles);
        }

        if (roles == null) {
            claims.put("sub", "user123");
            claims.put("iat", Instant.now().getEpochSecond());
        }

        return new Jwt(
                "fake-token",
                Instant.now(),
                Instant.now().plusSeconds(3600),
                Map.of("alg", "RS256"),
                claims
        );
    }
}