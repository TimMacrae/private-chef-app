import { apiConfig } from "@/lib/api/api-config";
import { CollaborationsUser, DeleteRequest } from "../collaboration.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeCollaborationInviteeClientAction } from "@/app/actions/collaboration-client.actions";

export const useRemoveCollaborationInvitee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collaborationId: DeleteRequest) => {
      return removeCollaborationInviteeClientAction(collaborationId);
    },

    onMutate: (variables) => {
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.COLLABORATION],
        (oldData: CollaborationsUser | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            receivedCollaborations: oldData.receivedCollaborations.filter(
              (collaboration) => collaboration.id !== variables.collaborationId
            ),
          };
        }
      );
    },

    onSuccess: (data) => {
      queryClient.setQueryData([apiConfig.QUERY_KEYS.COLLABORATION], data);
    },

    onError: (error) => {
      toast.error(`Failed to remove received collaborator: ${error.message}`);
    },
  });
};
