"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface FieldLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

export function FieldLabel({ children, htmlFor, className }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium text-fg mb-1.5 select-none",
        className,
      )}
    >
      {children}
    </label>
  );
}
