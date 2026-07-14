import React, { ReactNode } from "react";

interface SpinnerProps {
  size?: number | "sm" | "md" | "lg" | "xl";
  color?: string;
  thickness?: number | "sm" | "md" | "lg" | "xl";
  ariaLabel?: string;
  label?: string;
  icon?: ReactNode;
  speed?: "normal" | "medium" | "fast";
}

const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 40,
  xl: 54,
};

const THICKNESS_MAP = {
  sm: 1.5,
  md: 2,   
  lg: 3,
  xl: 4,   
};

export default function Spinner({
  size = "md",
  color = "currentColor",
  thickness = "md",
  ariaLabel = "Loading...",
  label,
  icon,
  speed = "normal",
}: SpinnerProps) {

  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];
  
  const speedTimes = {
    fast: "[animation-duration:0.6s]",
    medium: "[animation-duration:0.3s]",
    normal: "",
  };

  const lineThickness = typeof thickness === "number" ? thickness : THICKNESS_MAP[thickness || "md"];
  const speedClass = `animate-spin ${speedTimes[speed] || ""}`;

  return (
    <div 
      className="inline-flex items-center gap-2 text-fg font-sans leading-none" 
      role="status" 
      aria-label={label ? undefined : ariaLabel}
    >
      <div
        className={`${speedClass} shrink-0 flex items-center justify-center text-inherit`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        {icon ? (
          <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current text-inherit flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="12"
              y1="4.5"
              x2="12"
              y2="7.5"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="1"
            />
            <line
              x1="17.3"
              y1="6.7"
              x2="15.2"
              y2="8.8"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.87"
            />
            <line
              x1="19.5"
              y1="12"
              x2="16.5"
              y2="12"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.75"
            />
            <line
              x1="17.3"
              y1="17.3"
              x2="15.2"
              y2="15.2"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.62"
            />
            <line
              x1="12"
              y1="19.5"
              x2="12"
              y2="16.5"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="6.7"
              y1="17.3"
              x2="8.8"
              y2="15.2"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.37"
            />
            <line
              x1="4.5"
              y1="12"
              x2="7.5"
              y2="12"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.25"
            />
            <line
              x1="6.7"
              y1="6.7"
              x2="8.8"
              y2="8.8"
              stroke={color}
              strokeWidth={lineThickness}
              strokeLinecap="round"
              opacity="0.12"
            />
          </svg>
        )}
      </div>

      {label && (
        <span className="text-sm font-medium text-fg-muted select-none">
          {label}
        </span>
      )}
    </div>
  );
}