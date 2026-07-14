"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDrawer } from "./DrawerContext";

interface DrawerContentProps {
  children: React.ReactNode;
}

export function DrawerContent({ children }: DrawerContentProps) {
  const { 
    open, 
    setOpen, 
    isDragging, 
    setIsDragging, 
    currentOffset, 
    setCurrentOffset, 
    side 
  } = useDrawer();

  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 16);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
      
      const timeout = setTimeout(() => {
        setMounted(false);
      }, 400); 

      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleStart = (clientCoord: number) => {
    setIsDragging(true);
    setStartPos(clientCoord);
  };

  const handleMove = (clientCoord: number) => {
    if (!isDragging) return;
    const delta = clientCoord - startPos;
    
    if (side === "bottom" && delta > 0) setCurrentOffset(delta);
    if (side === "top" && delta < 0) setCurrentOffset(delta);
    if (side === "right" && delta > 0) setCurrentOffset(delta);
    if (side === "left" && delta < 0) setCurrentOffset(delta);
  };

  const handleEnd = () => {
    const absOffset = Math.abs(currentOffset);
    if (absOffset > 100) {
      setOpen(false);
    }
    setIsDragging(false);
    setCurrentOffset(0);
  };

  if (!mounted) return null;

  const sideConfig = {
    bottom: {
      flexContext: "items-end justify-center",
      panelStyles: "w-full max-h-[85vh] rounded-t-3xl border-t border-border",
      handleWrapper: "flex justify-center py-4 cursor-grab active:cursor-grabbing",
      handleBar: "h-1.5 w-16 rounded-full bg-subtle/80",
      closedTransform: "translateY(100%)",
      draggingTransform: `translateY(${currentOffset}px)`,
      getCoord: (e: React.MouseEvent | React.TouchEvent) => 'touches' in e ? e.touches[0].clientY : e.clientY
    },
    top: {
      flexContext: "items-start justify-center",
      panelStyles: "w-full max-h-[85vh] rounded-b-3xl border-b border-border",
      handleWrapper: "flex justify-center py-4 cursor-grab active:cursor-grabbing order-last",
      handleBar: "h-1.5 w-16 rounded-full bg-subtle/80",
      closedTransform: "translateY(-100%)",
      draggingTransform: `translateY(${currentOffset}px)`,
      getCoord: (e: React.MouseEvent | React.TouchEvent) => 'touches' in e ? e.touches[0].clientY : e.clientY
    },
    right: {
      flexContext: "items-center justify-end",
      panelStyles: "h-full w-full sm:w-96 border-l border-border",
      handleWrapper: "flex items-center px-4 cursor-grab active:cursor-grabbing h-full",
      handleBar: "w-1.5 h-16 rounded-full bg-subtle/80",
      closedTransform: "translateX(100%)",
      draggingTransform: `translateX(${currentOffset}px)`,
      getCoord: (e: React.MouseEvent | React.TouchEvent) => 'touches' in e ? e.touches[0].clientX : e.clientX
    },
    left: {
      flexContext: "items-center justify-start",
      panelStyles: "h-full w-full sm:w-96 border-r border-border",
      handleWrapper: "flex items-center px-4 cursor-grab active:cursor-grabbing h-full order-last",
      handleBar: "w-1.5 h-16 rounded-full bg-subtle/80",
      closedTransform: "translateX(-100%)",
      draggingTransform: `translateX(${currentOffset}px)`,
      getCoord: (e: React.MouseEvent | React.TouchEvent) => 'touches' in e ? e.touches[0].clientX : e.clientX
    }
  };

  const config = sideConfig[side];

  return (
    <div className={cn("fixed inset-0 z-999 flex", config.flexContext)}>
      {/* Backdrop Backdrop with dynamic fade timing */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-xs",
          "transition-opacity duration-400 ease-[cubic-bezier(0.32,0.94,0.6,1)]",
          animateIn ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Drawer Sheet Panel */}
      <div
        ref={drawerRef}
        className={cn(
          "relative bg-surface shadow-2xl flex will-change-transform z-10",
          side === "left" || side === "right" ? "flex-row" : "flex-col",
          config.panelStyles,
          !isDragging && "transition-transform duration-400"
        )}
        style={{
          transform: isDragging
            ? config.draggingTransform
            : animateIn
              ? "translate(0px, 0px)"
              : config.closedTransform,
          transitionTimingFunction: isDragging
            ? "none"
            : "cubic-bezier(0.32, 0.94, 0.6, 1)",
        }}
      >
        {/* Drag Handle Track Zone */}
        <div
          className={cn("select-none shrink-0", config.handleWrapper)}
          onMouseDown={(e) => handleStart(config.getCoord(e))}
          onMouseMove={(e) => handleMove(config.getCoord(e))}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(config.getCoord(e))}
          onTouchMove={(e) => handleMove(config.getCoord(e))}
          onTouchEnd={handleEnd}
        >
          <div className={config.handleBar} />
        </div>

        {/* Content Container Padding */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}