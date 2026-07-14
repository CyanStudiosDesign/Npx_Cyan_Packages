"use client";

import React, { useState, useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.ComponentPropsWithRef<"button">, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = props.id || generatedId;
    const [localChecked, setLocalChecked] = useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? !!controlledChecked : localChecked;

    const handleToggle = () => {
      if (disabled) return;
      if (!isControlled) {
        setLocalChecked(!isChecked);
      }
      onChange?.(!isChecked);
    };

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "flex shrink-0 h-5 w-5 items-center justify-center border-2 rounded-md transition-all duration-200 ease-out select-none",
          "active:scale-95", 
          
          "focus-ring-visible",
          disabled 
            ? "cursor-not-allowed bg-disabled border-disabled opacity-60 active:scale-100" 
            : "cursor-pointer",
          isChecked && !disabled 
            ? "bg-inverse border-inverse text-canvas" 
            : "bg-canvas border-border",
          className
        )}
        {...props}
      >
        <Check 
          className={cn(
            "h-3.5 w-3.5 stroke-[3.5] transition-all duration-200 ease-out origin-center",
            isChecked && !disabled
              ? "opacity-100 scale-100 rotate-0" 
              : "opacity-0 scale-50 -rotate-12"
          )} 
        />
      </button>
    );
  }
);

Checkbox.displayName = "Checkbox";