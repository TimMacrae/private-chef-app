import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface FeedbackMessageErrorProps {
  title?: string;
  message?: string;
}

export const FeedbackMessageError = ({
  title,
  message,
}: FeedbackMessageErrorProps) => {
  return (
    <Alert variant="destructive" data-testid="feedback-message-error">
      <AlertCircleIcon />
      <AlertTitle>{title || "An error occurred"}</AlertTitle>
      <AlertDescription>
        {message || "Please try again later."}
      </AlertDescription>
    </Alert>
  );
};
