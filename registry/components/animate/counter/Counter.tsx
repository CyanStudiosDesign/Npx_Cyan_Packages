"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useMotionTrigger } from "@/motion/useMotionTrigger";
import type { MotionProps } from "@/motion/types";
import styles from "./Counter.module.css";

export type CounterPlace = number | ".";
type CounterStyle = CSSProperties & {
  "--counter-duration": string;
};

export type CounterProps = MotionProps & {
  value: number;
  duration?: number;
  className?: string;
  separator?: string;
  decimals?: number;
  places?: CounterPlace[];
  allowNegative?: boolean;
  prefix?: string;
  suffix?: string;
};

export function Counter({
  value,
  duration = 0.45,
  className,
  startWhen,
  trigger,
  once,
  threshold,
  rootMargin,
  viewport,
  whileInView,
  transition,
  separator = ",",
  decimals,
  places,
  allowNegative = false,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const { ref: motionRef, shouldStart } = useMotionTrigger<HTMLSpanElement>({
    trigger,
    startWhen,
    once,
    threshold,
    rootMargin,
    viewport,
    whileInView,
  });
  const normalizedValue = allowNegative ? value : Math.max(value, 0);
  const displayedValue = shouldStart ? normalizedValue : 0;
  const activePlaces = places ?? getAutoPlaces(displayedValue, decimals);
  const wholePlaceIndexes = activePlaces
    .map((place, index) => (typeof place === "number" && place >= 1 ? index : null))
    .filter((index): index is number => index !== null);
  const label = `${prefix}${formatNumber(displayedValue, decimals, separator)}${suffix}`;
  const isNegative = displayedValue < 0;

  return (
    <span
      ref={motionRef}
      className={cn(styles.root, className)}
      style={{
        "--counter-duration": `${Math.max(transition?.duration ?? duration, 0)}s`,
      } as CounterStyle}
      aria-label={label}
      data-started={shouldStart ? "true" : "false"}
    >
      {prefix ? <span className={styles.static}>{prefix}</span> : null}
      {isNegative ? <span className={styles.static}>-</span> : null}
      <span aria-hidden="true" className={styles.value}>
        {activePlaces.map((place, index) => {
          if (place === ".") {
            return (
              <span key={`${place}-${index}`} className={styles.static}>
                .
              </span>
            );
          }

          const wholePlacePosition = wholePlaceIndexes.indexOf(index);
          const shouldShowSeparator =
            separator &&
            wholePlacePosition > 0 &&
            (wholePlaceIndexes.length - wholePlacePosition) % 3 === 0;

          return (
            <span key={`${place}-${index}`} className={styles.place}>
              {shouldShowSeparator ? (
                <span className={styles.static}>{separator}</span>
              ) : null}
              <Digit value={getDigit(displayedValue, place)} />
            </span>
          );
        })}
      </span>
      {suffix ? <span className={styles.static}>{suffix}</span> : null}
    </span>
  );
}

function Digit({ value }: { value: number }) {
  return (
    <span className={styles.digit} aria-hidden="true">
      <span
        className={styles.reel}
        style={{ transform: `translate3d(0, ${value * -1}em, 0)` }}
      >
        {Array.from({ length: 10 }, (_, digit) => (
          <span key={digit} className={styles.reelNumber}>
            {digit}
          </span>
        ))}
      </span>
    </span>
  );
}

function getDigit(value: number, place: number) {
  const absoluteValue = Math.abs(value);
  return Math.trunc(Math.floor(absoluteValue / place + Number.EPSILON * 100) % 10);
}

function getAutoPlaces(value: number, decimals?: number): CounterPlace[] {
  const absoluteValue = Math.abs(value);
  const wholeDigits = Math.max(1, Math.floor(absoluteValue).toString().length);
  const wholePlaces = Array.from({ length: wholeDigits }, (_, index) =>
    10 ** (wholeDigits - index - 1)
  );
  const decimalPlaces = Array.from({ length: decimals ?? 0 }, (_, index) =>
    10 ** -(index + 1)
  );

  if (decimalPlaces.length === 0) {
    return wholePlaces;
  }

  return [...wholePlaces, ".", ...decimalPlaces];
}

function formatNumber(value: number, decimals = 0, separator: string) {
  const fixedValue = value.toFixed(decimals);
  const [integerPart, decimalPart] = fixedValue.split(".");
  const sign = integerPart.startsWith("-") ? "-" : "";
  const unsignedInteger = sign ? integerPart.slice(1) : integerPart;
  const groupedInteger = unsignedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return `${sign}${groupedInteger}${decimalPart ? `.${decimalPart}` : ""}`;
}

export default Counter;
