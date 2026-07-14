"use client";

import React from "react";
import { useField } from "./Field";

const cn = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

interface FieldDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const FieldDescription = ({
  children,
  className,
}: FieldDescriptionProps) => {
  const { descriptionId } = useField();

  return (
    <p
      id={descriptionId}
      className={cn("text-xs text-muted-foreground", className)}
    >
      {children}
    </p>
  );
};
