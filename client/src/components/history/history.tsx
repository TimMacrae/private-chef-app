"use client";
import { useRecipes } from "@/hooks/query/use-recipes.query";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { HistoryTable } from "./history-table";
import { LoadingSpinner } from "../feedback/loading-spinner";
import { HistoryPagination } from "./history-pagination";
import { useState } from "react";

export function History() {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const { data, error, isLoading, isFetching } = useRecipes(page, pageSize);

  const recipes = data?.content ?? [];
  const pageInfo = data?.page;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <FeedbackMessageError
        title="Error loading meal planning"
        message={
          error instanceof Error ? error.message : "Something went wrong"
        }
      />
    );
  }

  return (
    <div>
      <LayoutContentTitle title="History" />
      <HistoryTable recipes={recipes} />
      <HistoryPagination
        pageInfo={pageInfo}
        isFetching={isFetching}
        onPageChange={setPage}
      />
    </div>
  );
}
