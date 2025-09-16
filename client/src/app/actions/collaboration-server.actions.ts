"use server";

import {
  CollaborationsUser,
  collaborationsUserSchema,
} from "@/components/collaboration/collaboration.type";
import { apiConfig } from "@/lib/api/api-config";
import { serverRequest } from "@/lib/api/api-server-request-handler";
import z from "zod";

export async function getCollaborationAction(): Promise<CollaborationsUser> {
  return await serverRequest(
    apiConfig.API.COLLABORATION,
    collaborationsUserSchema
  );
}
type InviteRequest = {
  token: string;
};

const emptySchema = z.void();
export async function addCollaborationIdToCollaborationUserByTokenServerAction(
  token: Partial<InviteRequest>
): Promise<void> {
  return await serverRequest(
    apiConfig.API.COLLABORATION_RECEIVE + token.token,
    emptySchema,
    {
      method: "POST",
    }
  );
}
