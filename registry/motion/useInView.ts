"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MotionViewportAmount } from "./types";

export type UseInViewOptions = {
  once?: boolean;
  amount?: MotionViewportAmount;
  margin?: string;
  rootMargin?: string;
  disabled?: boolean;
};

export function useInView<T extends Element = HTMLElement>({
  once = true,
  amount = "some",
  margin,
  rootMargin,
  disabled = false,
}: UseInViewOptions = {}) {
  const [node, setNode] = useState<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const hasEnteredRef = useRef(false);

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (disabled || !node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(() => {
        setIsInView(true);
        setHasEnteredView(true);
        hasEnteredRef.current = true;
      }, 0);

      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        if (visible) {
          hasEnteredRef.current = true;
          setHasEnteredView(true);
          setIsInView(true);

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin: rootMargin ?? margin ?? "0px",
        threshold: getThreshold(amount),
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [amount, disabled, margin, node, once, rootMargin]);

  return {
    ref,
    isInView,
    hasEnteredView,
    hasEnteredViewRef: hasEnteredRef,
  };
}

function getThreshold(amount: MotionViewportAmount) {
  if (amount === "all") return 1;
  if (amount === "some") return 0;
  return Math.min(Math.max(amount, 0), 1);
}
