"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useMotionTrigger } from "@/motion/useMotionTrigger";
import type { MotionProps } from "@/motion/types";
import styles from "./RotatingText.module.css";

export type RotatingTextProps = MotionProps & {
  text: string[];
  stayDuration?: number;
  stayDuratiion?: number;
  rotationDuration?: number;
  staggerDelay?: number;
  className?: string;
  loop?: boolean;
};

type RotatingTextStyle = CSSProperties & {
  "--rotating-text-duration": string;
};
type RotatingTextCharacterStyle = CSSProperties & {
  animationDelay: string;
};
type RotatingTextPart =
  | { kind: "space"; value: string }
  | { kind: "word"; value: Array<{ character: string; index: number }> };

export function RotatingText({
  text,
  stayDuration,
  stayDuratiion,
  rotationDuration = 0.42,
  staggerDelay = 0.035,
  className,
  startWhen,
  trigger,
  once,
  threshold,
  rootMargin,
  viewport,
  whileInView,
  transition,
  loop = true,
}: RotatingTextProps) {
  const items = useMemo(() => text.filter(Boolean), [text]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const { ref: motionRef, shouldStart } = useMotionTrigger<HTMLSpanElement>({
    trigger,
    startWhen,
    once,
    threshold,
    rootMargin,
    viewport,
    whileInView,
  });
  const activeStayDuration = stayDuration ?? stayDuratiion ?? 1.6;
  const activeRotationDuration = transition?.duration ?? rotationDuration;
  const activeStaggerDelay = transition?.staggerChildren ?? staggerDelay;
  const activeText = items[index] ?? items[0] ?? "";
  const parts = splitCharacters(activeText);
  const characterCount = countCharacters(parts);
  const transitionDuration =
    Math.max(activeRotationDuration, 0) +
    Math.max(characterCount - 1, 0) * Math.max(activeStaggerDelay, 0);

  useEffect(() => {
    if (!shouldStart || items.length <= 1) {
      return;
    }

    const stayTimer = window.setTimeout(() => {
      setPhase("exit");
    }, Math.max(activeStayDuration, 0) * 1000);

    return () => window.clearTimeout(stayTimer);
  }, [activeStayDuration, index, items.length, shouldStart]);

  useEffect(() => {
    if (phase !== "exit") {
      return;
    }

    const rotateTimer = window.setTimeout(() => {
      setIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) {
          return loop ? 0 : currentIndex;
        }

        return nextIndex;
      });
      setPhase("enter");
    }, transitionDuration * 1000);

    return () => window.clearTimeout(rotateTimer);
  }, [items.length, loop, phase, transitionDuration]);

  if (items.length === 0) {
    return null;
  }

  const style: RotatingTextStyle = {
    "--rotating-text-duration": `${Math.max(activeRotationDuration, 0)}s`,
  };

  return (
    <span
      ref={motionRef}
      className={cn(styles.root, className)}
      style={style}
      aria-label={activeText}
      aria-live="polite"
      data-started={shouldStart ? "true" : "false"}
    >
      <span
        key={`${activeText}-${phase}`}
        className={styles.item}
        data-phase={phase}
      >
        {parts.map((part, partIndex) => {
          if (part.kind === "space") {
            return (
              <span key={`${part.value}-${partIndex}`} className={styles.space}>
                {part.value}
              </span>
            );
          }

          return (
            <span key={`${part.value}-${partIndex}`} className={styles.word}>
              {part.value.map((character) => (
                <span
                  key={`${character.character}-${character.index}`}
                  className={styles.character}
                  style={getCharacterStyle(character.index, activeStaggerDelay)}
                >
                  {character.character}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function splitCharacters(text: string): RotatingTextPart[] {
  let index = 0;

  return text.split(/(\s+)/).map((token) => {
    if (/^\s+$/.test(token)) return { kind: "space", value: token };

    const value = Array.from(token).map((character) => {
      const characterPart = { character, index };
      index += 1;
      return characterPart;
    });

    return { kind: "word", value };
  });
}

function countCharacters(parts: RotatingTextPart[]) {
  return parts.reduce((total, part) => {
    if (part.kind === "word") return total + part.value.length;
    return total;
  }, 0);
}

function getCharacterStyle(
  index: number,
  staggerDelay: number
): RotatingTextCharacterStyle {
  return {
    animationDelay: `${index * Math.max(staggerDelay, 0)}s`,
  };
}

export default RotatingText;
