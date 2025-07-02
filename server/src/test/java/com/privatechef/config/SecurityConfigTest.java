package com.privatechef.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class SecurityConfigTest {

    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {
        securityConfig = new SecurityConfig();
        securityConfig.ISSUER_URI = "https://mock-issuer.com/";
        securityConfig.AUDIENCE = "your-api-audience";
        securityConfig.ROLE_CLAIM_NAMESPACE = "https://your-app.com/roles";
    }

    @Test
    void testJwtAuthenticationConverterBeanCreation() {
        Converter<Jwt, ? extends AbstractAuthenticationToken> converter = securityConfig.jwtAuthenticationConverter();
        assertNotNull(converter);
        assertInstanceOf(JwtAuthenticationConverter.class, converter);
    }

    @Test
    void testSecurityFilterChainCreation() throws Exception {
        HttpSecurity httpSecurity = mock(HttpSecurity.class, RETURNS_DEEP_STUBS);
        SecurityFilterChain filterChain = securityConfig.securityFilterChain(httpSecurity);
        assertNotNull(filterChain);
    }
}