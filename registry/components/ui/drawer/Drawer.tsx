"use client";

import { DrawerProvider, DrawerSide } from "./DrawerContext";

interface DrawerProps {
  children: React.ReactNode;
  side?: DrawerSide;
}

export function Drawer({ children, side = "bottom" }: DrawerProps) {
  return <DrawerProvider side={side}>{children}</DrawerProvider>;
}