import { updateMealPlanningClientAction } from "@/app/actions/meal-planning-client.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MealPlanning } from "../meal-planning.type";
import { apiConfig } from "@/lib/api/api-config";
import { toast } from "sonner";

export const useUpdateMealPlanning = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: MealPlanning) => {
      return updateMealPlanningClientAction(updatedData);
    },

    // Optimistic update
    onMutate: async (updatedMealPlan: MealPlanning) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: [apiConfig.QUERY_KEYS.MEAL_PLANNING],
      });

      // Snapshot the previous value
      const previousMealPlanning = queryClient.getQueryData<MealPlanning>([
        apiConfig.QUERY_KEYS.MEAL_PLANNING,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.MEAL_PLANNING],
        updatedMealPlan
      );

      // Return a context object with the snapshotted value
      return { previousMealPlanning };
    },

    onSuccess: (data) => {
      queryClient.setQueryData([apiConfig.QUERY_KEYS.MEAL_PLANNING], data);
    },

    onError: (error, variables, context) => {
      if (context?.previousMealPlanning) {
        queryClient.setQueryData(
          [apiConfig.QUERY_KEYS.MEAL_PLANNING],
          context.previousMealPlanning
        );
      }

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      toast.error(`Failed to update meal planning: ${errorMessage}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [apiConfig.QUERY_KEYS.MEAL_PLANNING],
      });
    },
  });
};
