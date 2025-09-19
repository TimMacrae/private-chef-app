import { getRecipesAction } from "@/app/actions/recipes-server.actions";
import { History } from "@/components/history/history";
import { LayoutContentContainer } from "@/components/layout/layout-content-container";

import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
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
        <History />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
