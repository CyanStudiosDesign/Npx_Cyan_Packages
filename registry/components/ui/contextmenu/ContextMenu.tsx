"use client";

import React, { useEffect, useState } from "react";
import { ContextMenuContent } from "./ContextMenuContent";
import { cn } from "@/lib/utils";

interface ContextMenuProps {
  children: React.ReactNode;
}

interface ContextMenuContentProps {
  children: React.ReactNode;
  x?: number;
  y?: number;
}

export function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    
    setOpen(false);

    setPosition({
      x: e.clientX,
      y: e.clientY,
    });

    setOpen(true);
  };

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={cn(
        "flex aspect-2/1 w-full max-w-md items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface text-sm text-fg-muted transition-colors",
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ContextMenuContent) {
          if (!open) return null;

          return React.cloneElement(
            child as React.ReactElement<ContextMenuContentProps>,
            {
              x: position.x,
              y: position.y,
            },
          );
        }
        return child;
      })}
    </div>
  );
}

export { ContextMenuContent };