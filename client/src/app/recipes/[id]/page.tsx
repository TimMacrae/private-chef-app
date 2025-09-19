import { getRecipeAction } from "@/app/actions/recipes-server.actions";
import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { RecipeId } from "@/components/recipes/recipe-id";
import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.HOME);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [apiConfig.QUERY_KEYS.RECIPE],
    queryFn: () => getRecipeAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContentContainer>
        <RecipeId id={id} />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
