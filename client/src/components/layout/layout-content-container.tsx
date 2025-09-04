import React from "react";

interface LayoutContentContainerProps {
  children: React.ReactNode;
}

export const LayoutContentContainer = ({
  children,
}: LayoutContentContainerProps) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">{children}</div>
    </main>
  );
};
