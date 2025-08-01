import React from "react";

interface LayoutContentTitleProps {
  title: string;
}

export const LayoutContentTitle = ({ title }: LayoutContentTitleProps) => {
  return <h1 className="text-2xl font-bold">{title}</h1>;
};
