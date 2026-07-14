"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ResizableProps = {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  dividerClassName?: string;
  direction?: "horizontal" | "vertical";
};

export default function Resizable({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 50,
  minLeftWidth = 0,
  maxLeftWidth = 100,
  className,
  leftClassName,
  rightClassName,
  dividerClassName,
  direction = "horizontal",
}: ResizableProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const containerSize = direction === "horizontal" ? rect.width : rect.height;

    const mousePosition =
      direction === "horizontal"
        ? event.clientX - rect.left
        : event.clientY - rect.top;

    let newLeftWidth = (mousePosition / containerSize) * 100;

    if (newLeftWidth <= 1.5) newLeftWidth = 0;
    if (newLeftWidth >= 98.5) newLeftWidth = 100;

    const clampedWidth = Math.min(
      Math.max(newLeftWidth, minLeftWidth),
      maxLeftWidth,
    );
    setLeftWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "flex h-full w-full select-none",
        !isHorizontal && "flex-col",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={cn(
          "overflow-hidden p-0 m-0 border-none",
          isHorizontal ? "h-full min-w-0" : "w-full min-h-0",
          leftWidth === 0 && "hidden pointer-events-none w-0 h-0",
          leftClassName
        )}
        style={
          isHorizontal
            ? { width: `${leftWidth}%` }
            : { height: `${leftWidth}%` }
        }
      >
        {leftPanel}
      </div>

      <div
        className={cn(
          isHorizontal
            ? "h-full w-1 cursor-col-resize"
            : "h-1 w-full cursor-row-resize",
          "bg-border hover:bg-fg-muted transition-colors shrink-0 z-10",
          dividerClassName,
        )}
        onMouseDown={() => setIsDragging(true)}
      />

      <div
        className={cn(
          "overflow-hidden p-0 m-0 border-none",
          isHorizontal ? "h-full min-w-0" : "w-full min-h-0",
          leftWidth === 100 && "hidden pointer-events-none w-0 h-0",
          rightClassName
        )}
        style={
          isHorizontal
            ? { width: `${100 - leftWidth}%` }
            : { height: `${100 - leftWidth}%` }
        }
      >
        {rightPanel}
      </div>
    </div>
  );
}