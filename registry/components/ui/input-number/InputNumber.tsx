import React from "react";

import {
  HorizontalVariant,
  VerticalVariant,
  CompactVariant,
  LabeledVariant,
} from "./InputNumberVariants";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  type?: "horizontal" | "vertical" | "compact" | "labeled";
  className?: string;
}

export const InputNumber = ({
  value,
  onChange,
  min = 0,
  max = 10000,
  step = 1,
  type = "horizontal",
  className,
}: InputNumberProps) => {
  const increment = () => {
    onChange(Math.min(value + step, max));
  };

  const decrement = () => {
    onChange(Math.max(value - step, min));
  };

  const variantProps = {
    value,
    min,
    max,
    className,
    onChange,
    increment,
    decrement,
  };

  switch (type) {
    case "vertical":
      return <VerticalVariant {...variantProps} />;

    case "compact":
      return <CompactVariant {...variantProps} />;

    case "labeled":
      return <LabeledVariant {...variantProps} />;

    default:
      return <HorizontalVariant {...variantProps} />;
  }
};

InputNumber.displayName = "InputNumber";
