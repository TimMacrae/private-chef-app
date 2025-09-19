import { getRecipesAction } from "@/app/actions/recipes-server.actions";
import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { RecipeGeneration } from "@/components/recipes/recipe-generation";
import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function RecipeGenerationPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.HOME);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [apiConfig.QUERY_KEYS.RECIPES],
    queryFn: () => getRecipesAction({ page: 0, size: 1 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContentContainer>
        <RecipeGeneration />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
