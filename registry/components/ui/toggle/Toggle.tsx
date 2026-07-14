import { useState, ReactElement } from "react";
import { cloneElement, isValidElement } from "react";

interface ToggleChipProps {
  ariaLabel: string;
  label?: string; 
  icon?: ReactElement<{ className?: string }>;
  size?: "sm" | "md" | "lg";
  variant?: "secondary" | "no_outline";
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const SIZE_STYLES = {
  sm: {
    container: "px-3 py-1 text-xs rounded-sm gap-1.5",
    iconOnly: "p-1.5 rounded-sm",
    iconSize: "w-3.5 h-3.5",
  },
  md: {
    container: "px-4 py-2 text-sm font-bold rounded-md gap-2",
    iconOnly: "p-2 rounded-md",   
    iconSize: "w-4 h-4",
  },
  lg: {
    container: "px-5 py-2.5 text-base rounded-lg gap-2.5",
    iconOnly: "p-2.5 rounded-lg", // 
    iconSize: "w-5 h-5",
  },
};

const VARIANT_STYLES = {
  secondary: {
    chip: {
      unchecked: "bg-transparent border-border text-fg font-semibold",
      checked: "bg-subtle border-border text-fg font-semibold",
      disabled: "bg-disabled border-border-disabled text-fg-subtle font-semibold",
    },
    icon: {
      unchecked: "text-fg-muted",
      checked: "fill-fg text-fg",
      disabled: "text-fg-subtle fill-none",
    },
  },
  no_outline: {
    chip: {
      unchecked: "bg-transparent border-transparent text-fg font-semibold",
      checked: "bg-subtle border-transparent text-fg font-bold", 
      disabled: "bg-disabled border-transparent text-fg-subtle font-semibold",
    },
    icon: {
      unchecked: "text-fg-muted",
      checked: "fill-fg text-fg",
      disabled: "text-fg-subtle fill-none",
    },
  },
};

export default function ToggleChip({
  ariaLabel,
  label,
  icon,
  size = "md",
  variant = "secondary",
  defaultChecked = false,
  disabled = false,
  onChange,
}: ToggleChipProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !checked;
    setChecked(newState);
    onChange?.(newState);
  };

  const isIconOnly = icon && !label;

  return (
    <label
      className={`
        inline-block select-none
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        className="sr-only"
        aria-label={ariaLabel}
      />

      <div
        className={`
          inline-flex items-center justify-center
          border border-solid
          transition-all duration-200
          focus-ring-visible
          ${isIconOnly ? SIZE_STYLES[size].iconOnly : SIZE_STYLES[size].container}

          ${
            checked
              ? VARIANT_STYLES[variant].chip.checked
              : VARIANT_STYLES[variant].chip.unchecked
          }

          ${disabled ? "bg-disabled text-fg-subtle border-border-disabled opacity-50" : ""}
        `}
      >
        {icon && (
          <span className="flex items-center justify-center shrink-0">
            {isValidElement(icon)
              ? cloneElement(icon, {
                  className: `
                    transition-colors duration-200
                    ${SIZE_STYLES[size].iconSize}
                    ${
                      checked
                        ? VARIANT_STYLES[variant].icon.checked
                        : VARIANT_STYLES[variant].icon.unchecked
                    }
                  `,
                })
              : icon}
          </span>
        )}

        {label && <span className="font-bold">{label}</span>}
      </div>
    </label>
  );
}