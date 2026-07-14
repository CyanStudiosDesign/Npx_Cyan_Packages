import React from "react";

interface TabsListProps {
  children: React.ReactNode;
}

export function TabsList({
  children,
}: TabsListProps) {
  return (
    <div className="inline-flex h-10 items-center
    justify-center rounded-md
    bg-subtle p-1 mb-1">
      {children}
    </div>
  );
}