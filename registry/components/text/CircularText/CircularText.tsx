"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useMotionTrigger } from "@/motion/useMotionTrigger";
import type { MotionProps } from "@/motion/types";
import styles from "./CircularText.module.css";

export type CircularTextProps = MotionProps & {
  text: string;
  duration?: number;
  className?: string;
  radius?: number;
};

type CircularTextStyle = CSSProperties & {
  "--circular-text-duration": string;
  "--circular-text-size": string;
  "--circular-text-radius": string;
};

type CircularCharacterStyle = CSSProperties & {
  "--circular-text-angle": string;
  "--circular-text-character-angle": string;
};

export function CircularText({
  text,
  duration = 10,
  className,
  radius = 72,
  startWhen,
  trigger,
  once,
  threshold,
  rootMargin,
  viewport,
  whileInView,
  transition,
}: CircularTextProps) {
  const { ref: motionRef, shouldStart } = useMotionTrigger<HTMLSpanElement>({
    trigger,
    startWhen,
    once,
    threshold,
    rootMargin,
    viewport,
    whileInView,
  });

  if (typeof text !== "string" || text.length === 0) {
    return null;
  }

  const characters = Array.from(text);
  const padding = Math.max(radius * 0.62, 64);
  const size = (radius + padding) * 2;
  const style: CircularTextStyle = {
    "--circular-text-duration": `${Math.max(
      transition?.duration ?? duration,
      0
    )}s`,
    "--circular-text-size": `${size}px`,
    "--circular-text-radius": `${radius}px`,
  };

  return (
    <span
      ref={motionRef}
      className={cn(styles.root, className)}
      style={style}
      aria-label={text}
      data-started={shouldStart ? "true" : "false"}
    >
      <span aria-hidden="true" className={styles.visual}>
        {characters.map((character, index) => {
          const angle = (360 / characters.length) * index;
          const characterStyle: CircularCharacterStyle = {
            "--circular-text-angle": `${angle}deg`,
            "--circular-text-character-angle": `${angle * -1}deg`,
          };

          return (
            <span
              key={`${character}-${index}`}
              className={styles.spoke}
              style={characterStyle}
            >
              <span className={styles.character}>
                {character === " " ? "\u00A0" : character}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

export default CircularText;
