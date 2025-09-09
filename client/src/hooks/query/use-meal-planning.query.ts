import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/lib/api/api-config";
import { getMealPlanningAction } from "@/app/actions/meal-planning-server.actions";

export const useMealPlanning = () => {
  return useQuery({
    queryKey: [apiConfig.QUERY_KEYS.MEAL_PLANNING],
    queryFn: getMealPlanningAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
