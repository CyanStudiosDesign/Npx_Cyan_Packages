import React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps {
  ratio?: number;
  children: React.ReactNode;
  className?: string;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 16 / 9,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-surface",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};
