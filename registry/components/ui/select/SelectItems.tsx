"use client";

import { cn } from "@/lib/utils";
import React from "react";

type SelectItemProps = {
  children: React.ReactNode;
  onSelect?: (value: string) => void;
};

export function SelectItem({ children, onSelect }: SelectItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(children as string)}
      className={cn(
        "flex w-full items-center rounded-full px-3 py-2 text-left text-sm text-fg transition-colors outline-none",
        "hover:bg-subtle focus:bg-subtle"
      )}
    >
      <span className="truncate">{children}</span>
    </button>
  );
}