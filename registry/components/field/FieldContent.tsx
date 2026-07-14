"use client";

import React from "react";

interface FieldContentProps {
  children: React.ReactNode;
  className?: string;
}

export const FieldContent = ({ children, className }: FieldContentProps) => {
  return <div className={`w-full${className ? ` ${className}` : ""}`}>{children}</div>;
};
