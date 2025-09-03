import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Preferences } from "@/components/preferences/preferences";
import { getPreferencesAction } from "../actions/preferences-server.actions";
import { LayoutContentContainer } from "@/components/layout/layout-content-container";

export default async function PreferencesPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.HOME);
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [apiConfig.QUERY_KEYS.PREFERENCES],
    queryFn: getPreferencesAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContentContainer>
        <Preferences />
      </LayoutContentContainer>
    </HydrationBoundary>
  );
}
