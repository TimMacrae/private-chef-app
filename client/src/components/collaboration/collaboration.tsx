"use client";
import { useCollaboration } from "@/hooks/query/use-collaboration.query";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { CollaborationForm } from "./collaboration-form";
import { CollaborationList } from "./collaboration-list";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { LoadingSpinner } from "../feedback/loading-spinner";

export function Collaboration() {
  const { data, error, isPending } = useCollaboration();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <FeedbackMessageError message={error.message} />;
  }

  return (
    <div>
      <LayoutContentTitle title="Collaboration" />
      <CollaborationForm />
      <CollaborationList
        invitedCollaborations={data?.invitedCollaborations || []}
        receivedCollaborations={data?.receivedCollaborations || []}
      />
    </div>
  );
}
