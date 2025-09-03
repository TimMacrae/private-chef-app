import {
  Preferences,
  PreferencesSchema,
} from "@/components/preferences/preferences.type";
import { clientRequest } from "@/lib/api/api-client-request-handler";
import { apiConfig } from "@/lib/api/api-config";

export async function putUpdatePreferencesClientAction(
  preferences: Partial<Preferences>
): Promise<Preferences> {
  return await clientRequest(apiConfig.API.PREFERENCES, PreferencesSchema, {
    method: "PUT",
    body: preferences,
  });
}
