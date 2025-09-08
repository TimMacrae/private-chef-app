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

    // PREFERENCES
    public static final String PREFERENCES = API_BASE + "/preferences";

    // MEAL_PLANING
    public static final String MEAL_PLANNING = API_BASE + "/meal-planning";
}
