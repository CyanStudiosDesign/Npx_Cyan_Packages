"use client";

import React, { useState } from "react";
import { TabsContext } from "./TabsContext";

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
