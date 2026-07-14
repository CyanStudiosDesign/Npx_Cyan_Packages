export type MotionTrigger = "immediate" | "in-view" | "manual";

export type MotionViewportAmount = number | "some" | "all";

export type MotionViewport = {
  once?: boolean;
  amount?: MotionViewportAmount;
  margin?: string;
  rootMargin?: string;
};

export type MotionTransition = {
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | string;
};

export type MotionState = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotate?: number | string;
  filter?: string;
};

export type MotionTriggerOptions = {
  trigger?: MotionTrigger;
  startWhen?: boolean;
  once?: boolean;
  threshold?: MotionViewportAmount;
  rootMargin?: string;
  viewport?: MotionViewport;
};

export type MotionProps = MotionTriggerOptions & {
  initial?: MotionState | string;
  animate?: MotionState | string;
  whileInView?: MotionState | string;
  transition?: MotionTransition;
};
