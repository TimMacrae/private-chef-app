import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/dist/client/components/navigation";
import { getRecipesAction } from "./actions/recipes-server.actions";
import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { Dashboard } from "@/components/dashboard/dashboard";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.HOME);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [apiConfig.QUERY_KEYS.RECIPES],
    queryFn: ({ pageParam = 0 }) =>
      getRecipesAction({ page: pageParam, size: 10 }),
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContentContainer>
        <Dashboard />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
