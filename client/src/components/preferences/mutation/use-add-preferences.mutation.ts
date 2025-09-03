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
      if (!field || !originalData[field]) {
        throw new Error("Preference field is required");
      }

      const currentArrayField = originalData[field] as string[];
      const newItems = item.split(",").map((i) => i.trim());

      // Filter out duplicates
      const filteredNewItems = newItems.filter(
        (newItem) => !currentArrayField.includes(newItem)
      );

      const updatedArrayField = [...currentArrayField, ...filteredNewItems];

      originalData[field] = updatedArrayField;
      return putUpdatePreferencesClientAction(originalData);
    },

    onMutate: async ({ field, item }) => {
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
      const newItems = item.split(",").map((i) => i.trim());

      // Filter out duplicates
      const filteredNewItems = newItems.filter(
        (newItem) => !currentArray.includes(newItem)
      );

      const updatedPreferences = {
        ...previousPreferences,
        [field]: [...currentArray, ...filteredNewItems],
      };

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
      if (errorMessage.includes("already exists")) {
        toast.warning(errorMessage);
      } else {
        toast.error(`Failed to add item: ${errorMessage}`);
      }
    },
  });
};
