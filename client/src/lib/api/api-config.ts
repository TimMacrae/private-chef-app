const isBrowser = typeof window !== "undefined";

const baseUrl = isBrowser
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error(
    "Missing API base URL. Set NEXT_PUBLIC_API_URL (for client) and API_BASE_URL (for server)."
  );
}

export const apiConfig = {
  URL: {
    BASE_URL: baseUrl,
    HOME: "/",
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_REGISTER: "/auth/login?screen_hint=signup",
    AUTH_ERROR: "/auth/error",
    PREFERENCES: "/preferences",
    MEAL_PLANNING: "/meal-planning",
    COLLABORATION: "/collaboration",
    RECIPE_GENERATION: "/recipes/recipe-generation",
  },
  API: {
    PREFERENCES: `${baseUrl}/preferences`,
    MEAL_PLANNING: `${baseUrl}/meal-planning`,
    COLLABORATION: `${baseUrl}/collaboration`,
    COLLABORATION_INVITE: `${baseUrl}/collaboration/invite`,
    COLLABORATION_UPDATE_STATUS: `${baseUrl}/collaboration/status`,
    COLLABORATION_REMOVE: `${baseUrl}/collaboration`,
    COLLABORATION_REMOVE_INVITEE: `${baseUrl}/collaboration/invitee`,
    COLLABORATION_RECEIVE: `${baseUrl}/collaboration/receive/`,
    RECIPE_GENERATION: `${baseUrl}/recipes/recipe-generation`,
    RECIPES: `${baseUrl}/recipes`,
  },
  ENDPOINTS: {
    USER: "/user",
    USER_PROFILE: "/user-profile",
  },
  QUERY_KEYS: {
    USER: "USER",
    USER_PROFILE: "USER_PROFILE",
    PREFERENCES: "PREFERENCES",
    MEAL_PLANNING: "MEAL_PLANNING",
    COLLABORATION: "COLLABORATION",
    RECIPES: "RECIPES",
  },
};
