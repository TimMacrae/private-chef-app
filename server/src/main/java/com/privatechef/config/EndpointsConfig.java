package com.privatechef.config;

public final class EndpointsConfig {
    private EndpointsConfig() {
    }

    // AUTH
    public static final String API_BASE = "/api";
    public static final String AUTH = API_BASE + "/auth";

    public static final String AUTH_ME = "/me";
    public static final String AUTH_ADMIN = "/admin";

    public static final String AUTH_ME_FULL = AUTH + AUTH_ME;
    public static final String AUTH_ADMIN_FULL = AUTH + AUTH_ADMIN;
}
