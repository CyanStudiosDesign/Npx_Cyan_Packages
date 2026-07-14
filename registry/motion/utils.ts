import type { MotionState, MotionTransition } from "./types";

export function isMotionState(value: MotionState | string | undefined) {
  return typeof value === "object" && value !== null;
}

export function resolveMotionState<T extends MotionState>(
  defaults: T,
  override?: MotionState | string
): T {
  if (!isMotionState(override)) return defaults;
  return { ...defaults, ...override };
}

export function toMotionValue(value: number | string | undefined, fallback: string) {
  if (typeof value === "number") return `${value}px`;
  return value ?? fallback;
}

export function toNumericMotionValue(
  value: number | string | undefined,
  fallback: string
) {
  if (typeof value === "number") return String(value);
  return value ?? fallback;
}

export function resolveTransitionDuration(
  duration: number | undefined,
  transition: MotionTransition | undefined,
  fallback: number
) {
  return Math.max(transition?.duration ?? duration ?? fallback, 0);
}

export function resolveTransitionDelay(
  delay: number | undefined,
  transition: MotionTransition | undefined
) {
  return Math.max(transition?.delay ?? delay ?? 0, 0);
}

export function resolveStagger(
  stagger: number | undefined,
  transition: MotionTransition | undefined,
  fallback: number
) {
  return Math.max(transition?.staggerChildren ?? stagger ?? fallback, 0);
}
