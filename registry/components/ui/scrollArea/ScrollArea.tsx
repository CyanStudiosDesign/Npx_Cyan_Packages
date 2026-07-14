"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ScrollAreaProps = {
  title?: string;
  items: string[];
  height?: string;
  className?: string;
  onItemSelect?: (item: string) => void;
};

export default function ScrollArea({
  title,
  items,
  height = "300px",
  className,
  onItemSelect,
}: ScrollAreaProps) {
  return (
    <div
      style={{ height }}
      className={cn(
        "flex w-full flex-col overflow-y-auto no-scrollbar overflow-x-hidden rounded-3xl border-2 border-border bg-surface p-4 shadow-2xl",
        className
      )}
    >
      {title && (
        <h2 className="px-2 pb-2.5 pt-1 text-xs font-bold tracking-wider text-fg-muted uppercase">
          {title}
        </h2>
      )}

      <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar max-h-full">
        {items.map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            onClick={() => onItemSelect?.(item)}
            className="flex w-full items-center rounded-full px-3 py-2 text-left text-sm text-fg transition-colors duration-100 hover:bg-subtle focus:bg-subtle focus:outline-none"
          >
            <span className="truncate">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}