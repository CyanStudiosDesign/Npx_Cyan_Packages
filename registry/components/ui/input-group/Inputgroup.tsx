"use client";

import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled" | "ghost";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  icon?: LucideIcon;
  inputSize?: InputSize;
  variant?: InputVariant;
  hasError?: boolean;
  iconClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      icon: Icon,
      inputSize = "md",
      variant = "outline",
      hasError = false,
      placeholder = "Search...",
      iconClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizeStyles: Record<InputSize, string> = {
      sm: "h-8 text-xs rounded-lg pl-8 pr-3",
      md: "h-10 text-sm rounded-xl pl-10 pr-4 md:h-11 md:text-base md:pl-12",
      lg: "h-12 text-base rounded-2xl pl-12 pr-5 md:h-14 md:text-lg md:pl-14",
    };

    const iconSizeStyles: Record<InputSize, string> = {
      sm: "left-2.5 h-3.5 w-3.5",
      md: "left-3.5 h-4 w-4 md:left-4 md:h-5 md:w-5",
      lg: "left-4 h-5 w-5 md:left-5 md:h-6 md:w-6",
    };

    const variantStyles: Record<InputVariant, string> = {
      outline:
        "bg-canvas border border-border focus:ring-2 focus:ring-ring focus:border-ring/30",
      filled:
        "bg-subtle/60 border-2 border-transparent focus:bg-canvas focus:border-ring focus:ring-0",
      ghost:
        "bg-transparent border border-transparent hover:bg-subtle/40 focus:bg-canvas focus:border-border focus:ring-0",
    };

    return (
      <div className="relative flex w-full items-center group">
        {Icon && (
          <Icon
            className={cn(
              "absolute text-fg-subtle opacity-70 pointer-events-none select-none transition-colors",
              "group-focus-within:text-ring",
              iconSizeStyles[inputSize],
              disabled && "opacity-30",
              hasError &&
                "text-destructive opacity-100 group-focus-within:text-destructive",
              iconClassName,
            )}
          />
        )}

        <input
          {...props}
          ref={ref}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full text-fg placeholder:text-fg-muted outline-none transition-all",
            "disabled:cursor-not-allowed disabled:opacity-40",
            sizeStyles[inputSize],
            variantStyles[variant],

            !Icon && "pl-3 sm:pl-4",

            hasError &&
              "border-destructive focus:ring-destructive/20 focus:border-destructive bg-destructive/5",

            className,
          )}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
