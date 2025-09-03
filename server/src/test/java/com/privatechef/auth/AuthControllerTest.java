package com.privatechef.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.privatechef.config.EndpointsConfig;
import com.privatechef.utils.mocks.MockJwtUtils;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtDecoder jwtDecoder;

    @Test
    void getCurrentUser_shouldReturnUnauthorizedWithoutToken() throws Exception {
        mockMvc.perform(get(EndpointsConfig.AUTH_ME_FULL))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "USER")
    void getCurrentUser_shouldAllowAdminAccessWithRole() throws Exception {
        mockMvc.perform(get(EndpointsConfig.AUTH_ME_FULL)
                        .with(authentication(MockJwtUtils.createUserToken())))
                .andExpect(status().isOk());
    }


    @Test
    void getCurrentAdminUser_shouldReturnUnauthorizedWithoutToken() throws Exception {
        mockMvc.perform(get(EndpointsConfig.AUTH_ADMIN_FULL))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getCurrentAdminUser_shouldAllowAdminAccessWithRole() throws Exception {
        mockMvc.perform(get(EndpointsConfig.AUTH_ADMIN_FULL)
                        .with(authentication(MockJwtUtils.createAdminToken())))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    void getCurrentAdminUser_shouldForbidAccessWithoutAdminRole() throws Exception {
        mockMvc.perform(get(EndpointsConfig.AUTH_ADMIN_FULL)
                        .with(authentication(MockJwtUtils.createUserToken())))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "USER")
    void getCurrentAdminUser_accessDeniedHandlerNotTheRightPrivileges() throws Exception {
        mockMvc.perform(get(EndpointsConfig.AUTH_ADMIN_FULL))
                .andExpect(status().isForbidden())
                .andExpect(content().json("""
                        {
                            "message": "You have not the right privileges"
                        }
                        """));
    }
}