package com.privatechef.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EndpointsConfigTest {

    @Test
    void endpointsConfig_apiBaseShouldBeApi() {
        assertEquals("/api", EndpointsConfig.API_BASE);
    }

    @Test
    void endpointsConfig_authShouldBeApiAuth() {
        assertEquals("/api/auth", EndpointsConfig.AUTH);
    }

    @Test
    void endpointsConfig_authMeShouldBeMe() {
        assertEquals("/me", EndpointsConfig.AUTH_ME);
    }

    @Test
    void endpointsConfig_authAdminShouldBeAdmin() {
        assertEquals("/admin", EndpointsConfig.AUTH_ADMIN);
    }

    @Test
    void endpointsConfig_authMeFullShouldBeApiAuthMe() {
        assertEquals("/api/auth/me", EndpointsConfig.AUTH_ME_FULL);
    }

    @Test
    void endpointsConfig_authAdminFullShouldBeApiAuthAdmin() {
        assertEquals("/api/auth/admin", EndpointsConfig.AUTH_ADMIN_FULL);
    }
}