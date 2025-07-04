package com.privatechef.auth;

import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class AudienceValidatorTest {

    private final String expectedAudience = "https://example-api.com";
    private final AudienceValidator validator = new AudienceValidator(expectedAudience);

    @Test
    void shouldPassValidationWhenAudienceIsValid() {
        Jwt jwt = buildJwtWithAudiences(List.of(expectedAudience));
        OAuth2TokenValidatorResult result = validator.validate(jwt);

        assertFalse(result.hasErrors(), "Validation should succeed for correct audience");
    }

    @Test
    void shouldFailValidationWhenAudienceIsMissing() {
        Jwt jwt = buildJwtWithAudiences(List.of("wrong-audience"));
        OAuth2TokenValidatorResult result = validator.validate(jwt);

        assertTrue(result.hasErrors(), "Validation should fail for incorrect audience");
        assertEquals("invalid_token", result.getErrors().iterator().next().getErrorCode());
    }

    private Jwt buildJwtWithAudiences(List<String> audiences) {
        return new Jwt(
                "fake-token-value",
                Instant.now(),
                Instant.now().plusSeconds(3600),
                Map.of("alg", "RS256"),
                Map.of("aud", audiences)
        );
    }
}