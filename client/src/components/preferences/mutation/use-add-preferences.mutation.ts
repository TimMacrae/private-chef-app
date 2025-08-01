"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "@/lib/api/api-config";
import {
  PreferenceArrayKeys,
  Preferences,
} from "@/components/preferences/preferences.type";
import { putUpdatePreferencesClientAction } from "@/app/actions/preferences-client.actions";
import { toast } from "sonner";

export const useAddPreferenceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      field,
      item,
      originalData,
    }: {
      field: keyof PreferenceArrayKeys;
      item: string;
      originalData: Preferences;
    }) => {
      if (!field) {
        throw new Error("Preference field is required");
      }

      // Use the original data (before optimistic update)
      const currentArray = (originalData[field] as string[]) || [];
      const updatedArray = [...currentArray, item];

      // Send entire preferences with updated array via PUT
      return putUpdatePreferencesClientAction({
        [field]: updatedArray,
      });
    },

    // Optimistic update
    onMutate: async ({ field, item }) => {
      // Cancel any outgoing refetches
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

      const currentArray = (previousPreferences[field] as string[]) || [];
      if (currentArray.includes(item)) {
        throw new Error(`"${item}" already exists in ${field}`);
      }

      const updatedPreferences = {
        ...previousPreferences,
        [field]: [...currentArray, item],
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

    onSuccess: (data, variables) => {
      queryClient.setQueryData([apiConfig.QUERY_KEYS.PREFERENCES], data);
      toast.success(`Added "${variables.item}" successfully`);
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
      if (errorMessage.includes("already exists")) {
        toast.warning(errorMessage);
      } else {
        toast.error(`Failed to add item: ${errorMessage}`);
      }
    },
  });
};
