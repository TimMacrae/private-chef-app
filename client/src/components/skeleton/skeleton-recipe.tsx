import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function SkeletonRecipe() {
  return (
    <Card className="w-full max-w-3xl mx-auto my-4">
      <CardHeader>
        <Skeleton className="w-full h-64 rounded-t-lg mb-4" />
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex flex-wrap gap-2 pt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-2 pl-5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-2 pl-5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-40" />
      </CardFooter>
    </Card>
  );
}
