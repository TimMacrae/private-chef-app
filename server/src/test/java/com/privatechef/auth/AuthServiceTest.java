package com.privatechef.auth;

import com.privatechef.utils.mocks.MockJwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class AuthServiceTest {

    private AuthService authService;


    @BeforeEach
    void setUp() {
        authService = new AuthService();
        ReflectionTestUtils.setField(authService, "ROLES_NAMESPACE", "test_role_claim_namespace");
    }

    @Test
    void shouldReturnCurrentUserWithId() {
        var jwt = MockJwtUtils.createUserToken().getToken();

        Map<String, Object> user = authService.getCurrentUser(jwt);

        assertNotNull(user);
        assertEquals("auth0|test-user", user.get("id"));
    }

    @Test
    void shouldReturnCurrentAdminUserWithRole() {
        var jwt = MockJwtUtils.createAdminToken().getToken();

        Map<String, Object> user = authService.getCurrentAdminUser(jwt);

        assertNotNull(user);
        assertEquals("auth0|test-admin-user", user.get("id"));
        assertTrue(user.containsKey("roles"));
        assertTrue(((Iterable<?>) user.get("roles")).iterator().hasNext());
        assertEquals("ADMIN", ((Iterable<?>) user.get("roles")).iterator().next());
    }

    @Test
    void shouldReturnAdminUserWithoutRolesIfMissing() {
        var jwt = MockJwtUtils.createUserToken().getToken();

        Map<String, Object> user = authService.getCurrentUser(jwt);

        assertNotNull(user);
        assertEquals("auth0|test-user", user.get("id"));
        assertFalse(user.containsKey("roles"));
    }
}