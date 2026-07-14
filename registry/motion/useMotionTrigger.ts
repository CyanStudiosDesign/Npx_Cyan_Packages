"use client";

import { useInView } from "./useInView";
import type { MotionProps, MotionTriggerOptions } from "./types";

export type UseMotionTriggerOptions = MotionTriggerOptions &
  Pick<MotionProps, "whileInView">;

export function useMotionTrigger<T extends Element = HTMLElement>({
  trigger,
  startWhen = true,
  once,
  threshold,
  rootMargin,
  viewport,
  whileInView,
}: UseMotionTriggerOptions = {}) {
  const resolvedTrigger = trigger ?? (whileInView ? "in-view" : "immediate");
  const resolvedOnce = viewport?.once ?? once ?? true;

  const inView = useInView<T>({
    once: resolvedOnce,
    amount: viewport?.amount ?? threshold ?? "some",
    margin: viewport?.margin,
    rootMargin: viewport?.rootMargin ?? rootMargin,
    disabled: resolvedTrigger !== "in-view",
  });

  const visible = resolvedOnce ? inView.hasEnteredView : inView.isInView;
  const shouldStart =
    resolvedTrigger === "immediate"
      ? startWhen !== false
      : resolvedTrigger === "manual"
        ? startWhen === true
        : startWhen !== false && visible;

  return {
    ref: inView.ref,
    isInView: inView.isInView,
    hasEnteredView: inView.hasEnteredView,
    shouldStart,
    trigger: resolvedTrigger,
  };
}
