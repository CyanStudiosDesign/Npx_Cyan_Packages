"use client";

import React, { createContext, useContext } from "react";

// Simple classNames utility to avoid dependency on '@/lib/utils'
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

type FieldContextType = {
  id?: string;
  error?: string;
  descriptionId?: string;
  errorId?: string;
};

const FieldContext = createContext<FieldContextType | null>(null);

export const useField = () => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error("Field components must be used within a Field");
  }

  return context;
};

interface FieldProps {
  id?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const Field = ({ id, error, className, children }: FieldProps) => {
  const descriptionId = id ? `${id}-description` : undefined;
  const errorId = id ? `${id}-error` : undefined;

  return (
    <FieldContext.Provider
      value={{
        id,
        error,
        descriptionId,
        errorId,
      }}
    >
      <div className={cn("flex flex-col gap-1", className)}>{children}</div>
    </FieldContext.Provider>
  );
};
