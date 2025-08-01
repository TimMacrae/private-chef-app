import { apiConfig } from "@/lib/api/api-config";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Preferences } from "../preferences.type";
import { putUpdatePreferencesClientAction } from "@/app/actions/preferences-client.actions";
import { toast } from "sonner";

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdatePreferencesClientAction,

    onMutate: async (newPreferences) => {
      await queryClient.cancelQueries({
        queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
      });

      const previousPreferences = queryClient.getQueryData<Preferences>([
        apiConfig.QUERY_KEYS.PREFERENCES,
      ]);

      if (previousPreferences) {
        queryClient.setQueryData([apiConfig.QUERY_KEYS.PREFERENCES], {
          ...previousPreferences,
          ...newPreferences,
        });
      }

      return { previousPreferences };
    },

    onSuccess: () => {
      toast.success("Preferences updated successfully");
    },

    onError: (error, variables, context) => {
      if (context?.previousPreferences) {
        queryClient.setQueryData(
          [apiConfig.QUERY_KEYS.PREFERENCES],
          context.previousPreferences
        );
      }
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to remove "${variables}": ${errorMessage}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
      });
    },
  });
};
