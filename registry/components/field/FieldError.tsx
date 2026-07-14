"use client";

import React from "react";
import { useField } from "./Field";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

interface FieldErrorProps {
  className?: string;
}

export const FieldError = ({ className }: FieldErrorProps) => {
  const { error, errorId } = useField();

  if (!error) return null;

  return (
    <p id={errorId} className={cn("text-xs text-destructive", className)}>
      {error}
    </p>
  );
};
