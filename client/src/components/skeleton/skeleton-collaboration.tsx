import { Skeleton } from "../ui/skeleton";
import { SkeletonTitle } from "./skeleton-title";

const SkeletonCollaboratorListItem = () => (
  <div
    className="flex items-center justify-between rounded-lg border p-4"
    data-testid="skeleton-collaborator-list-item"
  >
    <div className="flex items-center gap-4">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-5 w-32" />
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="h-7 w-20 rounded-md" />
      <Skeleton className="h-6 w-6" />
    </div>
  </div>
);

export function SkeletonCollaboration() {
  return (
    <div data-testid="loading-container">
      <SkeletonTitle />
      <div className="space-y-12">
        <div className="space-y-6" data-testid="skeleton-invite-form">
          <div className="space-y-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-10 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>

        <div className="space-y-6" data-testid="skeleton-collaborators-list">
          <Skeleton className="h-6 w-40" />
          <div className="space-y-4">
            <SkeletonCollaboratorListItem />
            <SkeletonCollaboratorListItem />
          </div>
        </div>
      </div>
    </div>
  );
}
