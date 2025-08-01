import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/lib/api/api-config";
import { getPreferencesAction } from "@/app/actions/preferences-server.actions";

export const usePreferences = () => {
  return useQuery({
    queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
    queryFn: getPreferencesAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
