import { apiConfig } from "@/lib/api/api-config";
import { CollaborationsUser, UpdateStatusRequest } from "../collaboration.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCollaborationInviteeClientAction } from "@/app/actions/collaboration-client.actions";

export const useUpdateInviteCollaboration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (update: UpdateStatusRequest) => {
      return updateCollaborationInviteeClientAction(update);
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.COLLABORATION],
        (oldData: CollaborationsUser | undefined) => {
          if (!oldData) {
            toast.error("No existing collaboration data found.");
            return;
          }
          const filtered = oldData.receivedCollaborations.filter(
            (collaboration) => collaboration.token !== data.token
          );
          return {
            ...oldData,
            receivedCollaborations: [...filtered, data],
          };
        }
      );
    },

    onError: (error) => {
      toast.error(`Failed to invite collaborator: ${error.message}`);
    },
  });
};
