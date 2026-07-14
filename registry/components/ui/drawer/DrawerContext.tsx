"use client";

import { createContext, useContext, useState } from "react";

export type DrawerSide = "top" | "bottom" | "left" | "right";

interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  currentOffset: number;
  setCurrentOffset: (offset: number) => void;
  side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used inside Drawer");
  }
  return context;
}

interface DrawerProviderProps {
  children: React.ReactNode;
  side: DrawerSide;
}

export function DrawerProvider({ children, side }: DrawerProviderProps) {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        isDragging,
        setIsDragging,
        currentOffset,
        setCurrentOffset,
        side,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}