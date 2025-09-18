import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonTitle } from "./skeleton-title";
import { SkeletonRecipe } from "./skeleton-recipe";

export function SkeletonRecipePage() {
  return (
    <div data-testid="loading-container">
      <SkeletonTitle />
      <div className="flex flex-wrap items-start gap-4 md:w-full">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <SkeletonRecipe />
    </div>
  );
}
