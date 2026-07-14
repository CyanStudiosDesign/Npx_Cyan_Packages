"use client";

import React, { createContext, useContext, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// CONTEXT & HOOKS
// ==========================================
type CollapsibleContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

export function useCollapsible() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error("useCollapsible sub-components must be used inside a <Collapsible /> provider.");
  }
  return ctx;
}

// ==========================================
// ROOT COMPONENT: Collapsible
// ==========================================
interface CollapsibleProps extends React.ComponentPropsWithRef<"div"> {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      children,
      className,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const [localOpen, setLocalOpen] = useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? !!controlledOpen : localOpen;

    const handleToggle = (value: boolean) => {
      if (!isControlled) {
        setLocalOpen(value);
      }
      onOpenChange?.(value);
    };

    return (
      <CollapsibleContext.Provider value={{ isOpen, setIsOpen: handleToggle }}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

// ==========================================
// SUB-COMPONENT: CollapsibleTrigger
// ==========================================
interface CollapsibleTriggerProps extends React.ComponentPropsWithRef<"button"> {}

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = useCollapsible();

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          setIsOpen(!isOpen);
          props.onClick?.(e);
        }}
        className={cn(
          "w-10 h-10 rounded-lg border border-border bg-canvas flex items-center justify-center hover:bg-surface/80 active:scale-95 transition focus-ring-visible cursor-pointer",
          className
        )}
        {...props}
      >
        {children || (
          <ChevronsUpDown
            className={cn(
              "h-4 w-4 text-fg-muted transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ==========================================
// SUB-COMPONENT: CollapsibleContent
// ==========================================
interface CollapsibleContentProps extends React.ComponentPropsWithRef<"div"> {
  alwaysVisible?: boolean;
}

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className, alwaysVisible = false, ...props }, ref) => {
    const { isOpen } = useCollapsible();

    if (!alwaysVisible && !isOpen) return null;

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";