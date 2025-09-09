import { Skeleton } from "../ui/skeleton";
import { SkeletonTitle } from "./skeleton-title";

const SkeletonPreferenceListItem = ({
  badgeCount,
  isNone,
}: {
  badgeCount?: number;
  isNone?: boolean;
}) => (
  <div className="space-y-2" data-testid="skeleton-preference-list-item">
    <Skeleton className="h-5 w-36" />
    {isNone && <Skeleton className="h-5 w-24" />}
    {badgeCount && badgeCount > 0 && (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: badgeCount }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-md" />
        ))}
      </div>
    )}
  </div>
);

export function SkeletonPreferences() {
  return (
    <div data-testid="loading-container">
      <SkeletonTitle />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
        <div className="space-y-8">
          {/* Core Preferences */}
          <div className="space-y-6" data-testid="skeleton-core-preferences">
            <Skeleton className="h-6 w-40" />
            <SkeletonPreferenceListItem isNone />
            <SkeletonPreferenceListItem badgeCount={1} />
            <SkeletonPreferenceListItem badgeCount={3} />
            <SkeletonPreferenceListItem badgeCount={1} />
          </div>

          {/* Culinary Preferences */}
          <div
            className="space-y-6"
            data-testid="skeleton-culinary-preferences"
          >
            <Skeleton className="h-6 w-48" />
            <SkeletonPreferenceListItem badgeCount={5} />
            <SkeletonPreferenceListItem badgeCount={2} />
            <SkeletonPreferenceListItem badgeCount={1} />
            <SkeletonPreferenceListItem isNone />
          </div>
        </div>

        <div className="space-y-8">
          {/* Meal Constraints */}
          <div className="space-y-6" data-testid="skeleton-meal-constraints">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Seasonal Preferences */}
          <div
            className="space-y-6"
            data-testid="skeleton-seasonal-preferences"
          >
            <Skeleton className="h-6 w-48" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
