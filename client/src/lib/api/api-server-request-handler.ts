"use server";
import { ZodSchema } from "zod";
import { getAuthToken } from "@/lib/auth/auth-utils";

interface ServerRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

export async function serverRequest<T>(
  endpoint: string,
  schema: ZodSchema<T>,
  options: ServerRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  try {
    // Get auth token
    const token = await getAuthToken();

    // Make request
    const response = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(message);
    }

    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204) {
      const validationResult = schema.safeParse(undefined);
      if (!validationResult.success) {
        console.error(
          "🚨 Server Zod validation failed: Received 204 No Content, but schema expected data.",
          validationResult.error.issues
        );
        throw new Error(
          "Zod validation failed: Server returned no content, but data was expected."
        );
      }
      return validationResult.data;
    }

    // Parse and validate
    const rawData = await response.json();
    const validationResult = schema.safeParse(rawData);

    if (!validationResult.success) {
      console.error("Zod validation failed:", validationResult.error.issues);
      throw new Error(
        "Zod validation failed: Invalid response format from server"
      );
    }

    return validationResult.data;
  } catch (error) {
    console.error(`Server request failed for ${endpoint}:`, error);
    throw error instanceof Error ? error : new Error("Unknown server error");
  }
}
