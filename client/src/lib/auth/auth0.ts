import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  async beforeSessionSaved(session) {
    return {
      ...session,
      user: {
        ...session.user,
      },
    };
  },
  // secret: process.env.AUTH0_SECRET!,
  // domain: process.env.AUTH0_ISSUER_BASE_URL!,
  // clientId: process.env.AUTH0_CLIENT_ID!,
  // clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  // appBaseUrl: process.env.AUTH0_BASE_URL!,
  // authorizationParameters: {
  //   scope: "openid profile email",
  //   audience: process.env.AUTH0_AUDIENCE, // optional depending on your API usage
  // },
  // session: {
  //   absoluteDuration: 60 * 60 * 24 * 30, // 30 days in seconds
  //   inactivityDuration: 60 * 60 * 24 * 7, // 7 days in seconds
  // },
  // routes: {
  //   callback: "/callback",
  // },
});
