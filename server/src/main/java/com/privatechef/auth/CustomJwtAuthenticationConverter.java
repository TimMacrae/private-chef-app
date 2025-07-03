package com.privatechef.auth;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class CustomJwtAuthenticationConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final String ROLE_CLAIM_NAMESPACE;

    public CustomJwtAuthenticationConverter(String roleClaim) {
        this.ROLE_CLAIM_NAMESPACE = roleClaim;
    }

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        List<String> roles = jwt.getClaimAsStringList(ROLE_CLAIM_NAMESPACE);

        if (roles == null) return Collections.emptyList();

        return roles.stream()
                .map(role -> "ROLE_" + role.toUpperCase()) // e.g. ROLE_ADMIN
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}