// client/src/lib/apiClient/index.ts

import { request } from "./api-request-handler";
import { ZodSchema } from "zod";

export const apiClient = {
  get: <T>(endpoint: string, schema: ZodSchema<T>) =>
    request<T>("GET", endpoint, schema),
  post: <T>(endpoint: string, schema: ZodSchema<T>, body: unknown) =>
    request<T>("POST", endpoint, schema, body),
  put: <T>(endpoint: string, schema: ZodSchema<T>, body: unknown) =>
    request<T>("PUT", endpoint, schema, body),
  patch: <T>(endpoint: string, schema: ZodSchema<T>, body: unknown) =>
    request<T>("PATCH", endpoint, schema, body),
  delete: <T>(endpoint: string, schema: ZodSchema<T>) =>
    request<T>("DELETE", endpoint, schema),
};
