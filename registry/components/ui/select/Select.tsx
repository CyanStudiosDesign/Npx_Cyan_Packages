"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface SelectProps {
  title: string;
  children: React.ReactNode;
}

export function Select({ title, children }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(title);
  const selectRef = useRef<HTMLDivElement>(null);

  function handleSelect(value: string) {
    setSelected(value);
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative flex w-full max-w-sm flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-11 w-full items-center justify-between px-4 text-sm font-medium text-fg transition-all outline-none",
          "bg-surface border-2 border-border rounded-xl shadow-sm hover:bg-subtle",
          // "focus:ring-2 focus:ring-ring focus:border-ring/30"
        )}
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Floating Dropdown Panel Box */}
      {open && (
        <div
          className={cn(
            "absolute left-0 -top-6 w-full max-h-60 overflow-y-auto no-scrollbar z-50 flex flex-col gap-1",
            "bg-surface border-2 border-border rounded-3xl p-4 shadow-2xl",
            "animate-in fade-in zoom-in-95 duration-100 origin-top"
          )}
        >
          {React.Children.map(children, (child: any) => {
            return React.cloneElement(child, {
              onSelect: handleSelect,
            });
          })}
        </div>
      )}
    </div>
  );
}