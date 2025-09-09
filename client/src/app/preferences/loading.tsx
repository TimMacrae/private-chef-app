import { LayoutContentContainer } from "@/components/layout/layout-content-container";

import { SkeletonPreferences } from "@/components/skeleton/skeleton-preferences";

export default function Loading() {
  return (
    <LayoutContentContainer>
      <SkeletonPreferences />
    </LayoutContentContainer>
  );
}
