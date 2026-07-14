"use client";

import { cn } from "@/lib/utils";

interface ContextMenuItemProps {
  children?: React.ReactNode;
  separator?: boolean;
  disabled?: boolean;
}

export function ContextMenuItem({
  children,
  separator,
  disabled,
}: ContextMenuItemProps) {
  if (separator) {
    
    return <hr className="-mx-4 my-1 border-t border-border/80" />;
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-between rounded-3xl", 
        "px-3 py-2",         
        "text-left text-sm",  
        "transition-colors",
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "text-fg hover:bg-subtle focus:bg-subtle focus:outline-none",
      )}
    >
      <div className="flex w-full items-center gap-2">
        {children}
      </div>
    </button>
  );
}