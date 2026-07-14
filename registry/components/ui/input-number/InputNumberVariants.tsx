import React from "react";

import { InputNumberButton, InputNumberField } from "./InputNumberControls";

interface VariantProps {
  value: number;
  min: number;
  max: number;
  className?: string;
  onChange: (value: number) => void;
  increment: () => void;
  decrement: () => void;
}

export const HorizontalVariant = ({
  value,
  min,
  max,
  onChange,
  increment,
  decrement,
  className,
}: VariantProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <InputNumberButton onClick={decrement} disabled={value <= min}>
        -
      </InputNumberButton>

      <InputNumberField value={value} onChange={onChange} min={min} max={max} />

      <InputNumberButton onClick={increment} disabled={value >= max}>
        +
      </InputNumberButton>
    </div>
  );
};

export const VerticalVariant = ({
  value,
  min,
  max,
  onChange,
  increment,
  decrement,
  className,
}: VariantProps) => {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <InputNumberButton onClick={increment} disabled={value >= max}>
        +
      </InputNumberButton>

      <InputNumberField value={value} onChange={onChange} min={min} max={max} />

      <InputNumberButton onClick={decrement} disabled={value <= min}>
        -
      </InputNumberButton>
    </div>
  );
};

export const CompactVariant = ({
  value,
  min,
  max,
  onChange,
  increment,
  decrement,
  className,
}: VariantProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <InputNumberButton compact onClick={decrement} disabled={value <= min}>
        -
      </InputNumberButton>

      <InputNumberField
        compact
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />

      <InputNumberButton compact onClick={increment} disabled={value >= max}>
        +
      </InputNumberButton>
    </div>
  );
};

export const LabeledVariant = ({
  value,
  min,
  max,
  onChange,
  increment,
  decrement,
  className,
}: VariantProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm text-fg-muted">Value</label>

      <div className="flex items-center gap-2">
        <InputNumberButton onClick={decrement} disabled={value <= min}>
          -
        </InputNumberButton>

        <InputNumberField
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />

        <InputNumberButton onClick={increment} disabled={value >= max}>
          +
        </InputNumberButton>
      </div>
    </div>
  );
};
