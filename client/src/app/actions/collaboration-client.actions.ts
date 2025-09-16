import {
  Collaboration,
  collaborationSchema,
  DeleteRequest,
  InviteRequest,
  UpdateStatusRequest,
} from "@/components/collaboration/collaboration.type";
import { clientRequest } from "@/lib/api/api-client-request-handler";
import { apiConfig } from "@/lib/api/api-config";
import z from "zod";

const emptySchema = z.void();

export async function inviteCollaboratorClientAction(
  email: Partial<InviteRequest>
): Promise<Collaboration> {
  return await clientRequest(
    apiConfig.API.COLLABORATION_INVITE,
    collaborationSchema,
    {
      method: "POST",
      body: email,
    }
  );
}

export async function removeCollaborationClientAction(
  collaborationId: Partial<DeleteRequest>
): Promise<void> {
  return await clientRequest(apiConfig.API.COLLABORATION, emptySchema, {
    method: "DELETE",
    body: collaborationId,
  });
}

export async function removeCollaborationInviteeClientAction(
  collaborationId: Partial<DeleteRequest>
): Promise<void> {
  return await clientRequest(
    apiConfig.API.COLLABORATION_REMOVE_INVITEE,
    emptySchema,
    {
      method: "DELETE",
      body: collaborationId,
    }
  );
}

export async function updateCollaborationInviteeClientAction(
  updateStatus: Partial<UpdateStatusRequest>
): Promise<Collaboration> {
  return await clientRequest(
    apiConfig.API.COLLABORATION_UPDATE_STATUS,
    collaborationSchema,
    {
      method: "PUT",
      body: updateStatus,
    }
  );
}
