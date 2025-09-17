import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getCollaborationAction } from "../actions/collaboration-server.actions";
import { Collaboration } from "@/components/collaboration/collaboration";

export default async function CollaborationPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.HOME);
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [apiConfig.QUERY_KEYS.COLLABORATION],
    queryFn: getCollaborationAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContentContainer>
        <Collaboration />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
