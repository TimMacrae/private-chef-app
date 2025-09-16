import { apiConfig } from "@/lib/api/api-config";
import { CollaborationsUser, DeleteRequest } from "../collaboration.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeCollaborationClientAction } from "@/app/actions/collaboration-client.actions";

export const useRemoveCollaboration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collaborationId: DeleteRequest) => {
      return removeCollaborationClientAction(collaborationId);
    },

    onMutate: (variables) => {
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.COLLABORATION],
        (oldData: CollaborationsUser | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            invitedCollaborations: oldData.invitedCollaborations.filter(
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
      toast.error(`Failed to remove invited collaborator: ${error.message}`);
    },
  });
};
