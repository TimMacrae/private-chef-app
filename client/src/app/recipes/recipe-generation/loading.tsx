import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { SkeletonRecipePage } from "@/components/skeleton/skeleton-recipe-page";

export default function Loading() {
  return (
    <LayoutContentContainer>
      <SkeletonRecipePage />
    </LayoutContentContainer>
  );
}
