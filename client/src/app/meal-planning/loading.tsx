import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { SkeletonMealPlanning } from "@/components/skeleton/skeleton-meal-planning";

export default function Loading() {
  return (
    <LayoutContentContainer>
      <SkeletonMealPlanning />
    </LayoutContentContainer>
  );
}
