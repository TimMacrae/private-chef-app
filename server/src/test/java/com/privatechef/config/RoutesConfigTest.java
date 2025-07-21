package com.privatechef.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoutesConfigTest {

    @Test
    void routesConfigTest_shouldHaveConstantValues() {
      
        
        assertEquals("/api/auth", RoutesConfig.API_AUTH);
        assertEquals("/api/auth/admin", RoutesConfig.API_AUTH_ADMIN);
        assertEquals("/api/auth/admin/**", RoutesConfig.API_AUTH_ADMIN_ALL);
        assertEquals("/me", RoutesConfig.ME);
        assertEquals("/admin", RoutesConfig.ADMIN);
        assertEquals("/api/v1/preferences", RoutesConfig.API_PREFERENCES);
    }
}