"use client";

import { useDrawer } from "./DrawerContext";

interface DrawerTriggerProps {
  children: React.ReactNode;
}

export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const { setOpen } = useDrawer();

  return (
    <div onClick={() => setOpen(true)} className="inline-flex">
      {children}
    </div>
  );
}
