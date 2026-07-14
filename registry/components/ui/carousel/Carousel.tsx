"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LERP = (a: number, b: number, t: number) => a + (b - a) * t;

interface CarouselContextType {
  idx: number;
  total: number;
  perView: number;
  scrollBy: number;
  gap: number;
  maxIdx: number;
  navStyle: string;
  indicator: string;
  speedFactor: number;
  isPlaying: boolean;
  goto: (i: number) => void;
  prev: () => void;
  next: () => void;
  startAutoplay: () => void;
  stopAutoplay: () => void;
}

const CarouselCtx = React.createContext<CarouselContextType | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselCtx);
  if (!ctx) throw new Error("useCarousel must be used inside <Carousel>");
  return ctx;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides?: React.ReactNode[];
  perView?: number;
  scrollBy?: number;
  gap?: number;
  navStyle?: "outside" | "inside" | "none";
  indicator?: "dots" | "numbers" | "progress" | "none";
  autoplay?: boolean;
  interval?: number;
  speedFactor?: number;
  className?: string;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      slides = [],
      perView = 1,
      scrollBy = 1,
      gap = 16,
      navStyle = "outside",
      indicator = "none",
      autoplay = false,
      interval = 2500,
      speedFactor = 0.08,
      className = "",
      ...props
    },
    ref,
  ) {
    const [idx, setIdx] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(autoplay);

    const total = slides.length;
    const maxIdx = Math.max(0, total - perView);

    const goto = React.useCallback(
      (i: number) => setIdx(Math.max(0, Math.min(i, maxIdx))),
      [maxIdx],
    );

    const prev = React.useCallback(
      () => goto(idx - scrollBy),
      [goto, idx, scrollBy],
    );
    const next = React.useCallback(
      () => goto(idx + scrollBy),
      [goto, idx, scrollBy],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      },
      [prev, next],
    );

    const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoplay = React.useCallback(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIdx((i) => (i >= maxIdx ? 0 : Math.min(i + scrollBy, maxIdx)));
      }, interval);
      setIsPlaying(true);
    }, [interval, maxIdx, scrollBy]);

    const stopAutoplay = React.useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsPlaying(false);
    }, []);

    React.useEffect(() => {
      if (autoplay) {
        startAutoplay();
      }
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [autoplay, startAutoplay]);

    const ctx = {
      idx,
      total,
      perView,
      scrollBy,
      gap,
      maxIdx,
      navStyle,
      indicator,
      speedFactor,
      isPlaying,
      goto,
      prev,
      next,
      startAutoplay,
      stopAutoplay,
    };

    return (
      <CarouselCtx.Provider value={ctx}>
        <div
          ref={ref}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          className={cn("carousel-root w-full relative outline-none select-none focus-ring-visible rounded-xl", className)}
          {...props}
        >
          <CarouselViewport
            autoplay={autoplay}
            startAutoplay={startAutoplay}
            stopAutoplay={stopAutoplay}
          >
            <CarouselTrack slides={slides} />

            {navStyle === "inside" && (
              <>
                <CarouselPrevious position="inside" />
                <CarouselNext position="inside" />
              </>
            )}

            {navStyle === "outside" && (
              <>
                <CarouselPrevious position="outside" />
                <CarouselNext position="outside" />
              </>
            )}

            {autoplay && <CarouselAutoplayToggle />}
          </CarouselViewport>

          <CarouselIndicator />
        </div>
      </CarouselCtx.Provider>
    );
  },
);

// ── Viewport ───────────────────────────────────────────────────────────────────
function CarouselViewport({
  children,
  autoplay,
  startAutoplay,
  stopAutoplay,
}: {
  children: React.ReactNode;
  autoplay: boolean;
  startAutoplay: () => void;
  stopAutoplay: () => void;
}) {
  return (
    <div
      className="w-full relative overflow-visible"
      onMouseEnter={() => autoplay && stopAutoplay()}
      onMouseLeave={() => autoplay && startAutoplay()}
    >
      <div className="w-full overflow-hidden rounded-lg">
        {children}
      </div>
    </div>
  );
}

// ── Track ───────────────────────────────────────────────────────────────────────
function CarouselTrack({ slides }: { slides: React.ReactNode[] }) {
  const { idx, perView, scrollBy, gap, total, speedFactor, goto } =
    useCarousel();
  const trackRef = React. useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const currentX = React.useRef(0);
  const targetX = React.useRef(0);
  const dragStartX = React.useRef(0);
  const dragDelta = React.useRef(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const getSlideWidth = React.useCallback(() => {
    const vp = trackRef.current?.parentElement;
    if (!vp) return 0;
    return (vp.clientWidth - gap * (perView - 1)) / perView;
  }, [gap, perView]);

  const getBaseOffset = React.useCallback(
    (i: number) => i * (getSlideWidth() + gap),
    [getSlideWidth, gap],
  );

  React.useEffect(() => {
    if (isDragging) return;
    targetX.current = -getBaseOffset(idx);

    const animate = () => {
      const dist = targetX.current - currentX.current;
      if (Math.abs(dist) < 0.15) {
        currentX.current = targetX.current;
      } else {
        currentX.current = LERP(currentX.current, targetX.current, speedFactor);
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentX.current}px)`;
      }
      if (Math.abs(dist) >= 0.15) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [idx, getBaseOffset, speedFactor, isDragging]);

  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setIsDragging(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    dragDelta.current = clientX - dragStartX.current;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentX.current + dragDelta.current}px)`;
    }
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const sw = getSlideWidth();

    if (dragDelta.current < -sw * 0.2) {
      goto(idx + scrollBy);
    } else if (dragDelta.current > sw * 0.2) {
      goto(idx - scrollBy);
    } else {
      targetX.current = -getBaseOffset(idx);
    }
    currentX.current = currentX.current + dragDelta.current;
  };

  return (
    <div
      ref={trackRef}
      role="presentation"
      style={{ gap: gap }}
      className="w-full flex will-change-transform"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
    >
      {slides.map((slide, i) => (
        <CarouselSlide
          key={i}
          index={i}
          total={total}
          perView={perView}
          gap={gap}
        >
          {slide}
        </CarouselSlide>
      ))}
    </div>
  );
}

function CarouselSlide({
  children,
  index,
  total,
  perView,
  gap,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  perView: number;
  gap: number;
}) {
  const safePerView = Math.max(1, perView);
  const basis = `calc(${100 / safePerView}% - ${(gap * (safePerView - 1)) / safePerView}px)`;

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      style={{
        flex: `0 0 ${basis}`,
        width: basis,
      }}
      className="min-w-0 box-sizing-border-box"
    >
      {children}
    </div>
  );
}

// ── Previous Button ─────────────────────────────────────────────────────────────
export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  { position?: "inside" | "outside"; className?: string }
>(function CarouselPrevious(
  { position = "outside", className = "", ...props },
  ref,
) {
  const { idx, prev } = useCarousel();
  const isInside = position === "inside";

  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        prev();
      }}
      disabled={idx === 0}
      aria-label="Previous slide"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-surface text-fg flex items-center justify-center cursor-pointer z-[var(--z-sticky)] transition-all disabled:opacity-25 disabled:pointer-events-none shadow-sm focus-ring-visible",
        isInside ? "left-3.5" : "-left-11",
        className
      )}
      {...props}
    >
      <ChevronLeft size={18} strokeWidth={2.5} className="text-fg-muted" />
    </button>
  );
});

// ── Next Button ──────────────────────────────────────────────────────────────────
export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  { position?: "inside" | "outside"; className?: string }
>(function CarouselNext(
  { position = "outside", className = "", ...props },
  ref,
) {
  const { idx, maxIdx, next } = useCarousel();
  const isInside = position === "inside";

  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        next();
      }}
      disabled={idx >= maxIdx}
      aria-label="Next slide"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-surface text-fg flex items-center justify-center cursor-pointer z-[var(--z-sticky)] transition-all disabled:opacity-25 disabled:pointer-events-none shadow-sm focus-ring-visible",
        isInside ? "right-3.5" : "-right-11",
        className
      )}
      {...props}
    >
      <ChevronRight size={18} strokeWidth={2.5} className="text-fg-muted" />
    </button>
  );
});

function CarouselAutoplayToggle() {
  const { isPlaying, startAutoplay, stopAutoplay } = useCarousel();
  return (
    <button
      onClick={() => (isPlaying ? stopAutoplay() : startAutoplay())}
      aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      className="absolute bottom-2.5 right-2.5 h-6 w-6 rounded-full border border-border/50 bg-surface/95 text-fg flex items-center justify-center cursor-pointer z-[var(--z-sticky)] text-xs shadow-sm focus-ring-visible"
    >
      {isPlaying ? "⏸" : "▶"}
    </button>
  );
}

function CarouselIndicator() {
  const { indicator, idx, maxIdx, scrollBy, goto } = useCarousel();
  if (indicator === "none") return null;
  const steps: number[] = [];
  for (let i = 0; i <= maxIdx; i += scrollBy) {
    steps.push(i);
  }
  if (steps[steps.length - 1] !== maxIdx && maxIdx > 0) {
    steps.push(maxIdx);
  }

  if (indicator === "dots") {
    return (
      <div className="flex justify-center gap-1.5 pt-3.5">
        {steps.map((stepIndex, dotPosition) => {
          const isActive =
            idx === stepIndex ||
            (idx > stepIndex &&
              (steps[dotPosition + 1] === undefined ||
                idx < steps[dotPosition + 1]));

          return (
            <button
              key={stepIndex}
              onClick={() => goto(stepIndex)}
              aria-label={`Go to page ${dotPosition + 1}`}
              className={cn(
                "h-1.5 transition-all duration-200 ease-out border-none p-0 cursor-pointer focus-ring-visible",
                isActive ? "w-5 rounded-sm bg-inverse" : "w-1.5 rounded-full bg-subtle"
              )}
            />
          );
        })}
      </div>
    );
  }

  if (indicator === "numbers") {
    const currentStep = steps.indexOf(idx) !== -1 ? steps.indexOf(idx) + 1 : 1;
    return (
      <div className="text-center pt-2.5 text-xs font-medium text-fg-subtle">
        {currentStep} / {steps.length}
      </div>
    );
  }

  if (indicator === "progress") {
    const currentStepIndex = steps.indexOf(idx) !== -1 ? steps.indexOf(idx) : 0;
    const pct = Math.round(((currentStepIndex + 1) / steps.length) * 100);
    return (
      <div className="mt-3 h-0.5 w-full bg-subtle rounded-full overflow-hidden">
        <div
          style={{ width: `${pct}%` }}
          className="h-full bg-inverse rounded-full transition-all duration-350 ease-out"
        />
      </div>
    );
  }

  return null;
}

export { CarouselTrack, CarouselSlide, CarouselIndicator };
export default Carousel;