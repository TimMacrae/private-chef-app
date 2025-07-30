import { ZodSchema } from "zod";
import { auth0 } from "../auth/auth0";

const getHeaders = async () => {
  const { token } = await auth0.getAccessToken();
  if (!token) {
    throw new Error("No access token found");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  schema: ZodSchema<T>,
  body?: unknown
): Promise<T> => {
  const headers = await getHeaders();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!res.ok) {
    const message = json?.message ?? "API request failed";
    throw new Error(message);
  }

  // Runtime type validation using Zod:
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    console.error("ZOD API response validation failed", parsed.error);
    throw new Error("Invalid response from server");
  }

  return parsed.data;
};
