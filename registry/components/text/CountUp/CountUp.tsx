"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionTrigger } from "@/motion/useMotionTrigger";
import type { MotionProps } from "@/motion/types";

export type CountUpProps = MotionProps & {
  start: number;
  end: number;
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  seperator?: string;
};

export function CountUp({
  start,
  end,
  delay = 0,
  duration = 1,
  className,
  startWhen,
  trigger,
  once,
  threshold,
  rootMargin,
  viewport,
  whileInView,
  transition,
  separator,
  seperator,
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { ref: motionRef, shouldStart } = useMotionTrigger<HTMLSpanElement>({
    trigger,
    startWhen,
    once,
    threshold,
    rootMargin,
    viewport,
    whileInView,
  });
  const activeSeparator = separator ?? seperator ?? ",";
  const decimals = useMemo(() => getDecimalPlaces(start, end), [start, end]);
  const activeDelay = transition?.delay ?? delay;
  const activeDuration = transition?.duration ?? duration;

  useEffect(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (!shouldStart) {
      return;
    }

    const safeDelay = Math.max(activeDelay, 0) * 1000;
    const safeDuration = Math.max(activeDuration, 0) * 1000;

    timeoutRef.current = window.setTimeout(() => {
      setValue(start);

      if (safeDuration === 0) {
        setValue(end);
        return;
      }

      const startedAt = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - startedAt) / safeDuration, 1);
        const easedProgress = easeOutCubic(progress);

        setValue(start + (end - start) * easedProgress);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    }, safeDelay);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [activeDelay, activeDuration, end, shouldStart, start]);

  const displayedValue = shouldStart ? value : start;

  return (
    <span
      ref={motionRef}
      className={cn(className)}
      aria-label={formatNumber(end, decimals, activeSeparator)}
      data-started={shouldStart ? "true" : "false"}
    >
      {formatNumber(displayedValue, decimals, activeSeparator)}
    </span>
  );
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function getDecimalPlaces(...values: number[]) {
  return values.reduce((maxDecimals, value) => {
    const decimalPart = String(value).split(".")[1];
    return Math.max(maxDecimals, decimalPart?.length ?? 0);
  }, 0);
}

function formatNumber(value: number, decimals: number, separator: string) {
  const fixedValue = value.toFixed(decimals);
  const [integerPart, decimalPart] = fixedValue.split(".");
  const sign = integerPart.startsWith("-") ? "-" : "";
  const unsignedInteger = sign ? integerPart.slice(1) : integerPart;
  const groupedInteger = unsignedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return `${sign}${groupedInteger}${decimalPart ? `.${decimalPart}` : ""}`;
}

export default CountUp;
