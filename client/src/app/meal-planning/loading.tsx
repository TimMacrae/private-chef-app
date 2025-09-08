import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import { LayoutContentContainer } from "@/components/layout/layout-content-container";

export default function Loading() {
  return (
    <LayoutContentContainer>
      <LoadingSpinner />
    </LayoutContentContainer>
  );
}
