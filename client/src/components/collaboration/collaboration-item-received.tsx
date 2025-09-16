import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Collaboration, CollaborationsStatus } from "./collaboration.type";
import { useRemoveCollaboration } from "./mutation/use-remove-collaboration.mutation";
import { useRemoveCollaborationInvitee } from "./mutation/use-remove-collaboration-invitee.mutation";
import { useUpdateInviteCollaboration } from "./mutation/use-update-invite-collaboration.mutation";

type CollaborationItemProps = {
  collaboration: Collaboration;
  type: "invited" | "received";
};

const getStatusVariant = (
  status: CollaborationsStatus
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "ACCEPTED":
      return "default";
    case "PENDING":
      return "secondary";
    case "DECLINED":
      return "destructive";
    default:
      return "outline";
  }
};

export function CollaborationItemReceived({
  collaboration,
  type,
}: CollaborationItemProps) {
  const { mutate: onRemoveCollaborator } = useRemoveCollaboration();
  const { mutate: onRemoveCollaboratorInvitee } =
    useRemoveCollaborationInvitee();
  const { mutate: onUpdateInvitation } = useUpdateInviteCollaboration();

  const handleRemoveCollaborator = (id: string) => {
    if (type === "invited")
      return onRemoveCollaborator({ collaborationId: id });
    if (type === "received")
      return onRemoveCollaboratorInvitee({ collaborationId: id });
  };

  const isPending = collaboration.status === "PENDING";

  const handleUpdateInvitation = (status: "ACCEPTED" | "DECLINED") => {
    // Implement the logic to accept the invitation
    console.log("Accepting invitation for token:", collaboration.token);
    onUpdateInvitation({
      token: collaboration.token,
      status: status,
    });
    // You might want to call a mutation or server action here
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <p className="font-medium text-sm">{collaboration.inviterId}</p>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Invited: {new Date(collaboration.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {isPending && (
          <>
            <Button
              className="capitalize"
              onClick={() => handleUpdateInvitation("ACCEPTED")}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="capitalize"
              onClick={() => handleUpdateInvitation("DECLINED")}
            >
              Decline
            </Button>
          </>
        )}
        {!isPending && (
          <>
            <Badge
              variant={getStatusVariant(collaboration.status)}
              className="capitalize"
            >
              {collaboration.status.toLowerCase()}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="hover:cursor-pointer"
              onClick={() => handleRemoveCollaborator(collaboration.id)}
              aria-label={`Remove collaborator ${collaboration.inviteeEmail}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
