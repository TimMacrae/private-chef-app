import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { MealPlanning } from "@/components/meal-planning/meal-planning";
import { getMealPlanningAction } from "../actions/meal-planning-server.actions";

export default async function MealPlanningPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.HOME);
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [apiConfig.QUERY_KEYS.MEAL_PLANNING],
    queryFn: getMealPlanningAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContentContainer>
        <MealPlanning />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
