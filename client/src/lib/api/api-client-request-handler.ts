"use client";
import { ZodSchema } from "zod";
import { getAccessToken } from "@auth0/nextjs-auth0";

interface ClientRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

export async function clientRequest<T>(
  endpoint: string,
  schema: ZodSchema<T>,
  options: ClientRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  try {
    // Get auth token
    const token = await getAccessToken();

    const response = await fetch(`${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`;

      console.error("❌ Client request failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      throw new Error(message);
    }

    // Parse response
    const rawData = await response.json();

    // Validate with Zod
    const validationResult = schema.safeParse(rawData);

    if (!validationResult.success) {
      console.error(
        "🚨 Client Zod validation failed:",
        validationResult.error.issues
      );
      throw new Error(
        "Zod validation failed: Invalid response format from server"
      );
    }

    return validationResult.data;
  } catch (error) {
    console.error(`💥 Client request failed for ${endpoint}:`, error);

    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Client request failed: ${error.message}`);
    }

    throw new Error("Client request failed: Unknown error");
  }
}
