package com.privatechef.auth;

import com.privatechef.utils.mocks.MockJwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Map;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AuthServiceTest {

    @InjectMocks
    private AuthService authService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ReflectionTestUtils.setField(authService, "ROLES_NAMESPACE", "test_role_claim_namespace");
    }

    @Test
    void getCurrentUser_shouldReturnCurrentUserWithId() {
        var jwt = MockJwtUtils.createUserToken().getToken();

        Map<String, Object> user = authService.getCurrentUser(jwt);

        assertNotNull(user);
        assertEquals("auth0|test-user", user.get("id"));
    }

    @Test
    void getCurrentAdminUser_shouldReturnCurrentAdminUserWithRole() {
        var jwt = MockJwtUtils.createAdminToken().getToken();

        Map<String, Object> user = authService.getCurrentAdminUser(jwt);

        assertNotNull(user);
        assertEquals("auth0|test-admin-user", user.get("id"));
        assertTrue(user.containsKey("roles"));
        assertTrue(((Iterable<?>) user.get("roles")).iterator().hasNext());
        assertEquals("ADMIN", ((Iterable<?>) user.get("roles")).iterator().next());
    }

    @Test
    void getCurrentAdminUser_shouldReturnAdminUserWithoutRolesIfMissing() {
        var jwt = MockJwtUtils.createUserToken().getToken();

        Map<String, Object> user = authService.getCurrentUser(jwt);

        assertNotNull(user);
        assertEquals("auth0|test-user", user.get("id"));
        assertFalse(user.containsKey("roles"));
    }

    @Test
    void getCurrentUserId_shouldReturnCurrentUserId() {
        var jwt = MockJwtUtils.createUserToken().getToken();
        String userId = authService.getCurrentUserId(jwt);
        assertNotNull(userId);
        assertEquals("auth0|test-user", userId);
    }

    @Test
    void getCurrentUserId_shouldThrowAnException() {
        Jwt jwt = mock(Jwt.class);
        when(jwt.getClaim("sub")).thenReturn(null);
        assertThrows(IllegalArgumentException.class, () -> authService.getCurrentUserId(jwt));
    }

}