"use client";

import { cn } from "@/lib/utils";
import React from "react";

type SelectGroupProps = {
  title: string;
  children: React.ReactNode;
  onSelect?: (value: string) => void;
  showDivider?: boolean;
};

export function SelectGroup({
  title,
  children,
  onSelect,
  showDivider = false,
}: SelectGroupProps) {
  return (
    <div className="flex flex-col py-1.5">
      <p className="px-2 pb-1.5 pt-1 text-xs font-bold tracking-wider text-fg-muted uppercase">
        {title}
      </p>
      
      <div className="flex flex-col gap-1">
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
            onSelect,
          })
        )}
      </div>

      {showDivider && <hr className="-mx-4 my-1 border-t border-border/80" />}
    </div>
  );
}