"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipDuration = 75 | 100 | 150 | 200 | 300 | 500;

type TooltipProps = {
  children: React.ReactNode;
  tooltipText: string;
  position?: TooltipPosition;
  duration?: TooltipDuration;
  className?: string;
};

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const durationStyles: Record<TooltipDuration, string> = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
};

export default function Tooltip({
  children,
  tooltipText,
  position = "top",
  duration = 200,
  className,
}: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-[--z-popover] whitespace-nowrap rounded-md border border-border bg-inverse px-3 py-2 text-sm font-medium text-fg-inverse shadow-sm transition-all",
          durationStyles[duration],
          positionStyles[position],
          show
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-95",
          className,
        )}
      >
        {tooltipText}
      </div>
    </div>
  );
}
