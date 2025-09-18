"use client";
import { useRecipes } from "@/hooks/query/use-recipes.query";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { HistoryTable } from "./history-table";

export function History() {
  const { data, error } = useRecipes();

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
      {data && <HistoryTable recipes={data} />}
    </div>
  );
}
