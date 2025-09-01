import { apiConfig } from "@/lib/api/api-config";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { PreferenceArrayKeys, Preferences } from "../preferences.type";
import { putUpdatePreferencesClientAction } from "@/app/actions/preferences-client.actions";
import { toast } from "sonner";

export const useRemovePreferenceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      field,
      item,
    }: {
      field: keyof PreferenceArrayKeys;
      item: string;
    }) => {
      const currentPreferences = queryClient.getQueryData<Preferences>([
        apiConfig.QUERY_KEYS.PREFERENCES,
      ]);

      if (!currentPreferences) {
        throw new Error("No preferences data available");
      }

      if (!field || !currentPreferences[field]) {
        throw new Error(`Field ${field} does not exist in preferences`);
      }

      // Use the original data (before optimistic update)
      const currentArrayField = currentPreferences[field] as string[];
      const updatedArrayField = currentArrayField.filter(
        (existingItem) => existingItem !== item
      );

      currentPreferences[field] = updatedArrayField;
      return putUpdatePreferencesClientAction(currentPreferences);
    },

    onMutate: async ({ field, item }) => {
      await queryClient.cancelQueries({
        queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
      });

      const previousPreferences = queryClient.getQueryData<Preferences>([
        apiConfig.QUERY_KEYS.PREFERENCES,
      ]);

      if (!field) {
        throw new Error(`Field ${field} does not exist in preferences`);
      }

      if (previousPreferences) {
        const currentArray = (previousPreferences[field] as string[]) || [];
        const updatedPreferences = {
          ...previousPreferences,
          [field]: currentArray.filter((existingItem) => existingItem !== item),
        };

        queryClient.setQueryData(
          [apiConfig.QUERY_KEYS.PREFERENCES],
          updatedPreferences
        );
      }

      return { previousPreferences };
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
      toast.error(`Failed to remove "${variables.item}": ${errorMessage}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
      });
    },
  });
};
