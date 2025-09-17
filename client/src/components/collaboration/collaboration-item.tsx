import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Collaboration, CollaborationsStatus } from "./collaboration.type";
import { useRemoveCollaboration } from "./mutation/use-remove-collaboration.mutation";
import { useRemoveCollaborationInvitee } from "./mutation/use-remove-collaboration-invitee.mutation";

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

export function CollaborationItem({
  collaboration,
  type,
}: CollaborationItemProps) {
  const { mutate: onRemoveCollaborator } = useRemoveCollaboration();
  const { mutate: onRemoveCollaboratorInvitee } =
    useRemoveCollaborationInvitee(); // --- IGNORE ---

  const handleRemoveCollaborator = (id: string) => {
    if (type === "invited")
      return onRemoveCollaborator({ collaborationId: id });
    if (type === "received")
      return onRemoveCollaboratorInvitee({ collaborationId: id });
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <p className="font-medium text-sm">{collaboration.inviteeEmail}</p>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Invited: {new Date(collaboration.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4">
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
      </div>
    </div>
  );
}
