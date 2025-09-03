import { apiConfig } from "@/lib/api/api-config";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Preferences,
  PreferenceSeasonalKey,
  PreferenceSeasonalSubKey,
  PreferenceSingleValueKeys,
} from "../preferences.type";
import { putUpdatePreferencesClientAction } from "@/app/actions/preferences-client.actions";
import { toast } from "sonner";

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      field,
      value,
      originalData,
    }: {
      field: keyof PreferenceSingleValueKeys | keyof PreferenceSeasonalKey;
      value: string | number | boolean | PreferenceSeasonalSubKey;
      originalData: Preferences;
    }) => {
      if (!field) {
        throw new Error("Preference field is required");
      }

      const updatedData = {
        ...originalData,
        [field]: value,
      };

      return putUpdatePreferencesClientAction(updatedData);
    },

    // Optimistic update
    onMutate: async ({ field, value }) => {
      await queryClient.cancelQueries({
        queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
      });

      const previousPreferences = queryClient.getQueryData<Preferences>([
        apiConfig.QUERY_KEYS.PREFERENCES,
      ]);

      if (!field) {
        throw new Error("Preference field is required");
      }

      if (!previousPreferences) {
        throw new Error("No preferences data available");
      }

      const updatedPreferences = {
        ...previousPreferences,
        [field]: value,
      };

      // Update cache optimistically
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.PREFERENCES],
        updatedPreferences
      );

      return {
        previousPreferences,
        originalData: previousPreferences,
      };
    },

    onSuccess: (data) => {
      queryClient.setQueryData([apiConfig.QUERY_KEYS.PREFERENCES], data);
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

      const fieldLabel = formatFieldLabel(variables.field);
      toast.error(`Failed to update ${fieldLabel}: ${errorMessage}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
      });
    },
  });
};

// Helper functions for better UX messages
const formatFieldLabel = (
  field: keyof PreferenceSingleValueKeys | keyof PreferenceSeasonalKey
): string => {
  switch (field) {
    case "maxPrepTimeMinutes":
      return "maximum prep time";
    case "budgetLevel":
      return "budget level";
    case "autoAdaptBasedOnFeedback":
      return "auto-adapt setting";
    case "cookingSkillLevel":
      return "cooking skill level";
    case "seasonalPreferences":
      return "seasonal preferences";
    default:
      return field;
  }
};
