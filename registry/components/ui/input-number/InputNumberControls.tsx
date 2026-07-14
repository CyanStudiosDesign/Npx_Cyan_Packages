import React from "react";

interface InputNumberButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export const InputNumberButton = ({
  children,
  onClick,
  disabled,
  compact = false,
}: InputNumberButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`focus-ring-visible flex items-center justify-center rounded-md border border-border text-fg disabled:opacity-50 ${
        compact ? "h-6 w-6" : "h-8 w-8"
      }`}
    >
      {children}
    </button>
  );
};

interface InputNumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}

export const InputNumberField = ({
  value,
  onChange,
  min,
  max,
  compact = false,
}: InputNumberFieldProps) => {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`focus-ring-visible rounded-md border border-border bg-canvas text-center text-fg ${
        compact ? "w-14 px-1 py-1 text-sm" : "w-20 px-2 py-1"
      }`}
    />
  );
};

InputNumberButton.displayName = "InputNumberButton";
InputNumberField.displayName = "InputNumberField";
