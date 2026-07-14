"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export interface MarqueeProps {
  /** Content to scroll. Repeated automatically to fill the track width. */
  children: ReactNode;
  /** Base scroll direction. Default 'left'. */
  direction?: "left" | "right";
  /** Pixels moved per animation frame. Higher = faster. Default 1. */
  speed?: number;
  /** Flip the direction based on the page's scroll direction. Default false. */
  reverseOnScroll?: boolean;
  /** Pause the animation while the marquee is hovered. Default false. */
  pauseOnHover?: boolean;
  /** Rotate the whole band, in degrees (e.g. -4 for a slanted marquee). Default 0. */
  angle?: number;
  /** Space between items and between repeated copies, in pixels. Default 0. */
  gap?: number;
  /** Minimum number of copies to render (a floor; more are added if needed). Default 2. */
  minCopies?: number;
  /** Respect the user's OS "reduce motion" setting (renders static if on). Default true. */
  respectReducedMotion?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 1,
  reverseOnScroll = false,
  pauseOnHover = false,
  angle = 0,
  gap = 0,
  minCopies = 2,
  respectReducedMotion = true,
  className,
  style,
}: MarqueeProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  const [copies, setCopies] = useState(minCopies);
  const [ready, setReady] = useState(false);
  const [reservedHeight, setReservedHeight] = useState(0);

  const offset = useRef(0);
  const setWidth = useRef(0);
  const scrollSign = useRef(1);
  const paused = useRef(false);

  const baseSign = direction === "left" ? -1 : 1;
  const angled = angle !== 0;
  const rad = (Math.abs(angle) * Math.PI) / 180;

  // Width the band needs so the tilt still spans the full width edge-to-edge.
  // A diagonal of slope θ must be 1/cos(θ) longer than the flat width, plus a
  // small buffer for the corners. This is what grows with the angle.
  const bandWidth = angled
    ? `${(100 / Math.cos(rad) + 6).toFixed(2)}%`
    : "100%";

  const measure = useCallback(() => {
    const band = bandRef.current;
    const container = containerRef.current;
    const unit = unitRef.current;
    if (!container || !unit) return;

    const containerWidth = container.clientWidth;
    const unitWidth = unit.offsetWidth;
    if (unitWidth === 0) return;

    const needed = Math.max(
      minCopies,
      Math.ceil(containerWidth / unitWidth) + 1,
    );
    setCopies(needed);
    setWidth.current = needed * (unitWidth + gap);

    // Reserve the band's true height once rotated: |w·sinθ| + |h·cosθ|.
    // Uses the actual (already widened) band width, so it stays correct.
    if (band && angle !== 0) {
      const w = band.offsetWidth;
      const h = band.offsetHeight;
      setReservedHeight(
        Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad)),
      );
    } else {
      setReservedHeight(0);
    }

    setReady(true);
  }, [gap, minCopies, angle, rad]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, children]);

  useEffect(() => {
    const unit = unitRef.current;
    if (!unit) return;
    setWidth.current = copies * (unit.offsetWidth + gap);
  }, [copies, gap]);

  useEffect(() => {
    if (!reverseOnScroll) {
      scrollSign.current = 1;
      return;
    }
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last) scrollSign.current = 1;
      else if (y < last) scrollSign.current = -1;
      last = y <= 0 ? 0 : y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reverseOnScroll]);

  useEffect(() => {
    if (
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let raf = 0;
    const tick = () => {
      if (!paused.current && setWidth.current > 0 && trackRef.current) {
        offset.current += baseSign * scrollSign.current * speed;
        if (offset.current <= -setWidth.current)
          offset.current += setWidth.current;
        else if (offset.current > 0) offset.current -= setWidth.current;
        trackRef.current.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [baseSign, speed, respectReducedMotion]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...(angled
          ? {
              height: reservedHeight ? `${reservedHeight}px` : undefined,
              overflow: "hidden",
            }
          : {}),
      }}
    >
      <div
        ref={bandRef}
        className={className}
        style={{
          transform: angled ? `rotate(${angle}deg)` : undefined,
          width: bandWidth,
          ...style,
        }}
      >
        <div
          ref={containerRef}
          style={{ overflow: "hidden", width: "100%" }}
          onMouseEnter={
            pauseOnHover ? () => (paused.current = true) : undefined
          }
          onMouseLeave={
            pauseOnHover ? () => (paused.current = false) : undefined
          }
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              width: "max-content",
              gap: `${gap}px`,
              willChange: "transform",
              opacity: ready ? 1 : 0,
            }}
          >
            {Array.from({ length: copies * 2 }).map((_, i) => (
              <div
                key={i}
                ref={i === 0 ? unitRef : undefined}
                style={{
                  flex: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: `${gap}px`,
                }}
              >
                {children}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
