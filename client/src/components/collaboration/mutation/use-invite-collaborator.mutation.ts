import { apiConfig } from "@/lib/api/api-config";
import { CollaborationsUser, InviteRequest } from "../collaboration.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { inviteCollaboratorClientAction } from "@/app/actions/collaboration-client.actions";

export const useInviteCollaborator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: InviteRequest) => {
      const existingCollaborators: CollaborationsUser | undefined =
        queryClient.getQueryData([apiConfig.QUERY_KEYS.COLLABORATION]);
      if (
        existingCollaborators &&
        existingCollaborators.invitedCollaborations.some(
          (collaborator) => collaborator.inviteeEmail === email.email
        )
      ) {
        return Promise.reject(
          toast.error(
            `Collaborator with email ${email.email} is already invited.`
          )
        );
      }

      return inviteCollaboratorClientAction(email);
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        [apiConfig.QUERY_KEYS.COLLABORATION],
        (oldData: CollaborationsUser | undefined) => {
          if (!oldData) {
            toast.error("No existing collaboration data found.");
            return;
          }
          return {
            ...oldData,
            invitedCollaborations: [...oldData.invitedCollaborations, data],
          };
        }
      );
    },

    onError: (error) => {
      toast.error(`Failed to invite collaborator: ${error.message}`);
    },
  });
};
