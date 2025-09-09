import React from "react";

interface LayoutContentContainerProps {
  children: React.ReactNode;
}

export const LayoutContentContainer = ({
  children,
}: LayoutContentContainerProps) => {
  return (
    <main className="container mx-auto p-8">
      <div className="space-y-6">{children}</div>
    </main>
  );
};
