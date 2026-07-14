"use client";

import { cn } from "@/lib/utils";

interface ContextMenuContentProps {
  children: React.ReactNode;
  x?: number;
  y?: number;
}

export function ContextMenuContent({
  children,
  x = 0,
  y = 0,
}: ContextMenuContentProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        left: x,
        top: y,
      }}
      className={cn(
        "fixed z-50 flex flex-col origin-top-left",
        "", 
        "rounded-3xl",  
        "border-2 border-border", 
        "bg-surface",    
        "p-2",              
        "shadow-2xl",  
        "animate-in fade-in zoom-in-95 duration-100", 
      )}
    >
      {children}
    </div>
  );
}