import { Auth0Client } from "@auth0/nextjs-auth0/server";
// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: process.env.AUTH0_SCOPE,
  },
  async beforeSessionSaved(session) {
    return {
      ...session,
      user: {
        ...session.user,
      },
    };
  },
});
