import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { SkeletonTitle } from "./skeleton-title";

export function SkeletonMealPlanning() {
  return (
    <div data-testid="loading-container">
      <SkeletonTitle />
      <div className="border rounded-lg">
        <Table data-testid="skeleton-meal-planning-table">
          <TableHeader data-testid="skeleton-meal-planning-table-header">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px]">
                <Skeleton className="h-5 w-16" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-5 w-24 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-5 w-24 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-5 w-24 mx-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-testid="skeleton-meal-planning-table-body">
            {Array.from({ length: 7 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-5 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-5 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-5 mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className="flex items-center space-x-2 justify-end mt-4"
        data-testid="skeleton-meal-planning-table-footer"
      >
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-11 rounded-full" />
      </div>
    </div>
  );
}
