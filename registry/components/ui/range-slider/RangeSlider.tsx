"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

// --- 1. CONTEXT TYPE SETUP ---
interface RangeSliderContextType {
  min: number;
  max: number;
  step: number;
  values: number[];
  colorScheme: string;
  disabled: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
  getPercentage: (value: number) => number;
  handleThumbStart: (
    index: number,
  ) => (e: React.MouseEvent | React.TouchEvent) => void;
  handleTrackClick: (clientX: number) => void;
}

const RangeSliderContext = createContext<RangeSliderContextType | undefined>(
  undefined,
);

const useRangeSlider = () => {
  const context = useContext(RangeSliderContext);
  if (!context)
    throw new Error(
      "RangeSlider sub-components must be used within a <RangeSlider />",
    );
  return context;
};

// --- 2. ROOT PARENT COMPONENT ---
interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  colorScheme?: string;
  disabled?: boolean;
  onChange?: (values: number[]) => void;
  children: React.ReactNode;
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [20, 80],
  colorScheme = "var(--color-primary)",
  disabled = false,
  onChange,
  children,
}: RangeSliderProps) {
  const [values, setValues] = useState<number[]>(defaultValue);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const activeThumbIndex = useRef<number | null>(null);

  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const updateValueFromCoordinate = useCallback(
    (clientX: number, targetIndex?: number) => {
      if (!trackRef.current || disabled) return;

      const idx =
        targetIndex !== undefined ? targetIndex : activeThumbIndex.current;
      if (idx === null) return;

      const rect = trackRef.current.getBoundingClientRect();
      const trackWidth = rect.width;
      const clickRatio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / trackWidth),
      );

      let newValue = min + clickRatio * (max - min);
      newValue = Math.round(newValue / step) * step;

      setValues((prevValues) => {
        const nextValues = [...prevValues];

        if (nextValues.length === 2) {
          if (idx === 0 && newValue >= nextValues[1])
            newValue = nextValues[1] - step;
          if (idx === 1 && newValue <= nextValues[0])
            newValue = nextValues[0] + step;
        }

        nextValues[idx] = newValue;
        return nextValues;
        return nextValues;
      });
    },
    [min, max, step, disabled, onChange],
  );

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateValueFromCoordinate(clientX);
    },
    [updateValueFromCoordinate],
  );

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  const handleEnd = useCallback(() => {
    activeThumbIndex.current = null;
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", handleEnd);
    window.removeEventListener("touchmove", handleMove);
    window.removeEventListener("touchend", handleEnd);
  }, [handleMove]);

  const handleTrackClick = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const trackWidth = rect.width;
      const clickRatio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / trackWidth),
      );
      const targetValue = min + clickRatio * (max - min);

      let closestIndex = 0;
      if (values.length === 2) {
        const distToMin = Math.abs(values[0] - targetValue);
        const distToMax = Math.abs(values[1] - targetValue);
        if (distToMax < distToMin) {
          closestIndex = 1;
        }
      }

      activeThumbIndex.current = closestIndex;
      updateValueFromCoordinate(clientX, closestIndex);

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    },
    [
      min,
      max,
      values,
      disabled,
      updateValueFromCoordinate,
      handleMove,
      handleEnd,
    ],
  );

  const handleThumbStart =
    (index: number) => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      activeThumbIndex.current = index;

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    };

  useEffect(() => {
    return () => handleEnd();
  }, [handleEnd]);

  return (
    <RangeSliderContext.Provider
      value={{
        min,
        max,
        step,
        values,
        colorScheme,
        disabled,
        trackRef,
        getPercentage,
        handleThumbStart,
        handleTrackClick,
      }}
    >
      <div
        className={`relative w-full py-4 select-none touch-none ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        {children}
      </div>
    </RangeSliderContext.Provider>
  );
}

// --- 3. CONTENT (TRACK & FILL) COMPONENT ---
interface RangeSliderContentProps {
  className?: string;
}

export function RangeSliderContent({
  className = "h-2 w-full bg-border rounded-full",
}: RangeSliderContentProps) {
  const {
    values,
    getPercentage,
    colorScheme,
    disabled,
    trackRef,
    handleTrackClick,
  } = useRangeSlider();

  const isRange = values.length === 2;
  const leftPercent = isRange ? getPercentage(values[0]) : 0;
  const rightPercent = isRange
    ? getPercentage(values[1])
    : getPercentage(values[0]);
  const widthPercent = rightPercent - leftPercent;

  const onTrackDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    handleTrackClick(clientX);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={onTrackDown}
      onTouchStart={onTrackDown}
      className={`relative ${className} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div
        className="absolute h-full rounded-full pointer-events-none"
        style={{
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
          backgroundColor: disabled
            ? "var(--color-muted, #94a3b8)"
            : colorScheme,
        }}
      />
    </div>
  );
}

// --- 4. THUMB (HANDLE) COMPONENT ---
interface RangeSliderThumbProps {
  index: 0 | 1;
  className?: string;
}

export function RangeSliderThumb({
  index,
  className = "h-5 w-5 bg-surface border-2 rounded-full shadow-sm hover:scale-110 transition-transform focus-ring-visible",
}: RangeSliderThumbProps) {
  const { values, getPercentage, colorScheme, disabled, handleThumbStart } =
    useRangeSlider();

  if (index === 1 && values.length < 2) return null;

  const positionPercent = getPercentage(values[index]);

  return (
    <div
      role="slider"
      aria-valuenow={values[index]}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onMouseDown={handleThumbStart(index)}
      onTouchStart={handleThumbStart(index)}
      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 ${className} ${
        disabled
          ? "cursor-not-allowed active:scale-100"
          : "cursor-grab active:cursor-grabbing"
      }`}
      style={{
        left: `${positionPercent}%`,
        zIndex: index === 0 ? "var(--z-base)" : "calc(var(--z-base) + 1)",
        borderColor: disabled ? "var(--color-muted, #94a3b8)" : colorScheme,
      }}
    />
  );
}
