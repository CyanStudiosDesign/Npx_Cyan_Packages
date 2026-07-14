"use client";

import React, { useContext } from "react";
import { TabsContext } from "./TabsContext";

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({
  value,
  children,
}: TabsContentProps) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      "TabsContent must be used inside Tabs"
    );
  }

  const { activeTab } = context;

  if (activeTab !== value) {
    return null;
  }

  return (
    <div className="mt-2
    rounded-md
    border
    border-border
    bg-canvas
    p-6
    shadow-sm
    w-80
    text-fg
  ">
      {children}
    </div>
  );
}