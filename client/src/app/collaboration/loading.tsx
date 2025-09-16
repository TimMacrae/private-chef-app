import { LayoutContentContainer } from "@/components/layout/layout-content-container";
import { SkeletonCollaboration } from "@/components/skeleton/skeleton-collaboration";

export default function Loading() {
  return (
    <LayoutContentContainer>
      <SkeletonCollaboration />
    </LayoutContentContainer>
  );
}
