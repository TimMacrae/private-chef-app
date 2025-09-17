import { Collaboration } from "./collaboration.type";
import { CollaborationItem } from "./collaboration-item";
import { CollaborationItemReceived } from "./collaboration-item-received";

type CollaborationListProps = {
  invitedCollaborations: Collaboration[];
  receivedCollaborations: Collaboration[];
};

export function CollaborationList({
  invitedCollaborations,
  receivedCollaborations,
}: CollaborationListProps) {
  return (
    <div className="mt-16">
      <CollaborationListSection
        title="Invited Collaborators"
        collaborations={invitedCollaborations}
        noContentMessage="You haven't invited any collaborators yet."
        type="invited"
      />
      <CollaborationListSection
        title="Received Collaborations"
        collaborations={receivedCollaborations}
        noContentMessage="You haven't received any collaboration requests yet."
        type="received"
      />
    </div>
  );
}

function CollaborationListSection({
  title,
  collaborations,
  noContentMessage,
  type,
}: {
  title: string;
  collaborations: Collaboration[];
  noContentMessage: string;
  type: "invited" | "received";
}) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      {collaborations && collaborations.length > 0 ? (
        <div className="space-y-4">
          {collaborations.map((collaboration) => {
            if (type === "received") {
              return (
                <CollaborationItemReceived
                  key={collaboration.id}
                  collaboration={collaboration}
                  type={type}
                />
              );
            }
            return (
              <CollaborationItem
                key={collaboration.id}
                collaboration={collaboration}
                type={type}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">{noContentMessage}</p>
        </div>
      )}
    </div>
  );
}
