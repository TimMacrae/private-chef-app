import { apiConfig } from "@/lib/api/api-config";
import { auth0 } from "@/lib/auth/auth0";

import { redirect } from "next/navigation";
import { addCollaborationIdToCollaborationUserByTokenServerAction } from "@/app/actions/collaboration-server.actions";

export default async function CollaborationInvitationPage({
  params,
}: {
  params: { token: string };
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect(apiConfig.URL.AUTH_REGISTER);
  }

  const { token } = params;
  await addCollaborationIdToCollaborationUserByTokenServerAction({ token });

  redirect(apiConfig.URL.COLLABORATION);
}
