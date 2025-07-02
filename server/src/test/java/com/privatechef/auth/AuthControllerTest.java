package com.privatechef.auth;

import com.privatechef.utils.mocks.MockJwtUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnUnauthorizedWithoutToken() throws Exception {
        mockMvc.perform(get("/api/auth/admin"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldAllowAdminAccessWithRole() throws Exception {
        mockMvc.perform(get("/api/auth/admin")
                        .with(authentication(MockJwtUtils.createAdminToken())))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    void shouldForbidAccessWithoutAdminRole() throws Exception {
        mockMvc.perform(get("/api/auth/admin")
                        .with(authentication(MockJwtUtils.createUserToken())))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "USER")
    void accessDeniedHandlerNotTheRightPrivileges() throws Exception {
        mockMvc.perform(get("/api/auth/admin"))
                .andExpect(status().isForbidden())
                .andExpect(content().json("""
                        {
                            "error": "You have not the right privileges"
                        }
                        """));
    }
}