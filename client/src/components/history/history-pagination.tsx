"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PageInfo {
  number: number;
  totalPages: number;
}

interface HistoryPaginationProps {
  pageInfo?: PageInfo;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

export function HistoryPagination({
  pageInfo,
  isFetching,
  onPageChange,
}: HistoryPaginationProps) {
  if (!pageInfo) return null;

  const { number, totalPages } = pageInfo;

  const hasPreviousPage = number > 0;
  const hasNextPage = number < totalPages - 1;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(number - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(number + 1);
    }
  };

  return (
    <Pagination className="mt-6 justify-end">
      <PaginationContent>
        <PaginationItem className="hover:cursor-pointer">
          <PaginationPrevious
            onClick={handlePrevious}
            aria-disabled={!hasPreviousPage || isFetching}
            className={
              !hasPreviousPage || isFetching
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
        <PaginationItem className="hover:cursor-pointer">
          <PaginationNext
            onClick={handleNext}
            aria-disabled={!hasNextPage || isFetching}
            className={
              !hasNextPage || isFetching
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
