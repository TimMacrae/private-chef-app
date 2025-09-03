import { auth0 } from "./auth0";

export const getAuthToken = async () => {
  const session = await auth0.getSession();
  if (!session) throw new Error("Not authenticated");

  const token = session.tokenSet?.accessToken;

  if (!token) throw new Error("No access token found");
  return token;
};
