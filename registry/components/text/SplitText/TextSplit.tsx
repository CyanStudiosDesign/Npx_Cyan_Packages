"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useMotionTrigger } from "@/motion/useMotionTrigger";
import type { MotionProps, MotionState } from "@/motion/types";
import styles from "./TextSplit.module.css";

export type TextSplitType = "chars" | "words" | "lines" | "line";
export type TextSplitDirection = "up" | "down" | "left" | "right" | "none";
export type TextSplitMotionState = MotionState;
type TextSplitOffset = {
  x: number | string;
  y: number | string;
};
type TextSplitResolvedMotionState = Required<
  Pick<TextSplitMotionState, "opacity" | "x" | "y" | "scale" | "filter">
>;

export type TextSplitProps = MotionProps & {
  text: string;
  splitType?: TextSplitType;
  mode?: TextSplitType;
  direction?: TextSplitDirection;
  from?: TextSplitMotionState;
  to?: TextSplitMotionState;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  className?: string;
};

type TextSplitStyle = CSSProperties & {
  "--text-split-duration": string;
  "--text-split-from-opacity": string;
  "--text-split-from-x": string;
  "--text-split-from-y": string;
  "--text-split-from-scale": string;
  "--text-split-from-filter": string;
  "--text-split-to-opacity": string;
  "--text-split-to-x": string;
  "--text-split-to-y": string;
  "--text-split-to-scale": string;
  "--text-split-to-filter": string;
};

type SplitPart =
  | { kind: "space"; value: string }
  | { kind: "line"; value: string; index: number }
  | { kind: "animated"; value: string; index: number }
  | { kind: "word"; value: Array<{ character: string; index: number }> };

type IndexedPartStyle = CSSProperties & {
  animationDelay: string;
};

const directionOffsets: Record<TextSplitDirection, TextSplitOffset> = {
  up: { x: 0, y: "0.75em" },
  down: { x: 0, y: "-0.75em" },
  left: { x: "0.75em", y: 0 },
  right: { x: "-0.75em", y: 0 },
  none: { x: 0, y: 0 },
};

export function TextSplit({
  text,
  splitType,
  mode,
  direction = "up",
  from,
  to,
  initial,
  animate,
  whileInView,
  transition,
  trigger,
  startWhen,
  once,
  threshold,
  rootMargin,
  viewport,
  delay = 0,
  duration = 0.7,
  staggerDelay,
  className,
}: TextSplitProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const { ref: motionRef, shouldStart } = useMotionTrigger<HTMLSpanElement>({
    trigger,
    startWhen,
    once,
    threshold,
    rootMargin,
    viewport,
    whileInView,
  });

  useEffect(() => {
    let startFrame = 0;
    const resetFrame = requestAnimationFrame(() => {
      setHasStarted(false);

      startFrame = requestAnimationFrame(() => {
        setHasStarted(shouldStart);
      });
    });

    return () => {
      cancelAnimationFrame(resetFrame);
      cancelAnimationFrame(startFrame);
    };
  }, [
    direction,
    duration,
    mode,
    shouldStart,
    splitType,
    staggerDelay,
    text,
  ]);

  if (typeof text !== "string" || text.length === 0) {
    return null;
  }

  const resolvedSplitType = normalizeSplitType(splitType ?? mode ?? "chars");
  const parts = splitText(text, resolvedSplitType);
  const animatedCount = countAnimatedParts(parts);
  const childDuration = Math.max(transition?.duration ?? duration, 0);
  const initialMotion = from ?? initial;
  const targetMotion = to ?? whileInView ?? animate;
  const computedStagger =
    animatedCount > 1
      ? Math.max(
          (duration - Math.min(duration, 0.7)) / (animatedCount - 1),
          0.035
        )
      : 0;
  const stagger = Math.max(
    transition?.staggerChildren ?? staggerDelay ?? computedStagger,
    0
  );
  const activeDelay = Math.max(transition?.delay ?? delay, 0);
  const initialState = resolveMotionState(
    {
      opacity: 0,
      scale: 1,
      filter: "none",
      ...directionOffsets[direction],
    },
    initialMotion
  );
  const targetState = resolveMotionState(
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "none",
    },
    targetMotion
  );

  const rootStyle: TextSplitStyle = {
    "--text-split-duration": `${childDuration}s`,
    "--text-split-from-opacity": initialState.opacity,
    "--text-split-from-x": initialState.x,
    "--text-split-from-y": initialState.y,
    "--text-split-from-scale": initialState.scale,
    "--text-split-from-filter": initialState.filter,
    "--text-split-to-opacity": targetState.opacity,
    "--text-split-to-x": targetState.x,
    "--text-split-to-y": targetState.y,
    "--text-split-to-scale": targetState.scale,
    "--text-split-to-filter": targetState.filter,
  };

  return (
    <span
      ref={motionRef}
      className={cn(styles.root, className)}
      data-started={hasStarted ? "true" : "false"}
      style={rootStyle}
    >
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true" className={styles.visual}>
        {parts.map((part, index) => {
          if (part.kind === "space") {
            return (
              <span key={`${part.value}-${index}`} className={styles.space}>
                {part.value}
              </span>
            );
          }

          if (part.kind === "line") {
            return (
              <span
                key={`${part.value}-${part.index}`}
                className={cn(styles.part, styles.line)}
                style={getPartStyle(part.index, activeDelay, stagger)}
              >
                {part.value || "\u00A0"}
              </span>
            );
          }

          if (part.kind === "word") {
            return (
              <span key={`${part.value}-${index}`} className={styles.word}>
                {part.value.map((character) => {
                  return (
                    <span
                      key={`${character.character}-${character.index}`}
                      className={styles.part}
                      style={getPartStyle(character.index, activeDelay, stagger)}
                    >
                      {character.character}
                    </span>
                  );
                })}
              </span>
            );
          }

          return (
            <span
              key={`${part.value}-${part.index}`}
              className={styles.part}
              style={getPartStyle(part.index, activeDelay, stagger)}
            >
              {part.value}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function splitText(
  text: string,
  splitType: Exclude<TextSplitType, "line">
): SplitPart[] {
  if (splitType === "lines") return splitLines(text);
  return splitType === "words" ? splitWords(text) : splitCharacters(text);
}

function splitLines(text: string): SplitPart[] {
  return text.split(/\r?\n/).map((line, index) => ({
    kind: "line",
    value: line,
    index,
  }));
}

function splitWords(text: string): SplitPart[] {
  let index = 0;

  return text.split(/(\s+)/).map((token) => {
    if (/^\s+$/.test(token)) return { kind: "space", value: token };

    const part = { kind: "animated" as const, value: token, index };
    index += 1;
    return part;
  });
}

function splitCharacters(text: string): SplitPart[] {
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

function countAnimatedParts(parts: SplitPart[]) {
  return parts.reduce((total, part) => {
    if (part.kind === "animated") return total + 1;
    if (part.kind === "line") return total + 1;
    if (part.kind === "word") return total + part.value.length;
    return total;
  }, 0);
}

function normalizeSplitType(
  splitType: TextSplitType
): Exclude<TextSplitType, "line"> {
  return splitType === "line" ? "lines" : splitType;
}

function getPartStyle(
  index: number,
  delay: number,
  stagger: number
): IndexedPartStyle {
  return {
    animationDelay: `${Math.max(delay, 0) + index * stagger}s`,
  };
}

function resolveMotionState(
  defaults: TextSplitResolvedMotionState,
  override?: TextSplitMotionState | string
) {
  const resolvedOverride = typeof override === "object" ? override : undefined;

  return {
    opacity: `${resolvedOverride?.opacity ?? defaults.opacity}`,
    x: formatDistance(resolvedOverride?.x ?? defaults.x),
    y: formatDistance(resolvedOverride?.y ?? defaults.y),
    scale: `${resolvedOverride?.scale ?? defaults.scale}`,
    filter: resolvedOverride?.filter ?? defaults.filter,
  };
}

function formatDistance(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

export default TextSplit;
