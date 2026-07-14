"use client";

import React from "react";
// simple classnames utility to avoid external dependency
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
import { useField } from "./Field";

interface FieldTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const FieldTitle = ({ children, className }: FieldTitleProps) => {
  const { id } = useField();

  return (
    <label
      htmlFor={id}
      className={cn("text-sm font-medium text-foreground", className)}
    >
      {children}
    </label>
  );
};
