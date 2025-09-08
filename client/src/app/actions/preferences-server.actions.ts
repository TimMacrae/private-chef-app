// app/actions/preferences.ts
"use server";

import {
  Preferences,
  PreferencesSchema,
} from "@/components/preferences/preferences.type";
import { apiConfig } from "@/lib/api/api-config";
import { serverRequest } from "@/lib/api/api-server-request-handler";

export async function getPreferencesAction(): Promise<Preferences> {
  return await serverRequest(apiConfig.API.PREFERENCES, PreferencesSchema);
}
