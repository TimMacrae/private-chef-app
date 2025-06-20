export const apiConfig = {
  URL: {
    BASE_URL:
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` ||
      "http://localhost:8080/api",
    HOME: "/",
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_REGISTER: "/auth/login?screen_hint=signup",
    AUTH_ERROR: "/auth/error",
  },
  ENDPOINTS: {
    USER: "/user",
    USER_PROFILE: "/user-profile",
    // Add more endpoints as needed
  },
  QUERY_KEYS: {
    USER: "USER",
    USER_PROFILE: "USER_PROFILE",
  },
};
