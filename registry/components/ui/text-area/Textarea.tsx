"use client";

import React, { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ disabled, className, onChange, placeholder = "Type your message here...", ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = "auto";
      
      const nextHeight = textarea.scrollHeight;
      const maxHeight = 200; // Matches max-h-[200px] (around 12.5rem)

      if (nextHeight >= maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        setIsScrollable(true);
      } else {
        textarea.style.height = `${nextHeight}px`;
        setIsScrollable(false);
      }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (onChange) onChange(e);
    };

    useEffect(() => {
      adjustHeight();
    }, []);

    return (
      <div className="w-full flex flex-col group">
        <div className="relative w-full flex items-center">
          <textarea
            {...props}
            ref={textareaRef}
            disabled={disabled}
            onChange={handleTextChange}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "w-full min-h-11 max-h-50 resize-none text-sm text-fg transition-all outline-none",
              "bg-canvas border-2 border-border rounded-xl px-4 py-2 shadow-inner no-scrollbar",
              "placeholder:text-fg-muted",
              "focus:ring-2 focus:ring-ring focus:border-ring/30",
              "disabled:cursor-not-allowed disabled:opacity-40",
              
              isScrollable ? "overflow-y-auto" : "overflow-hidden",
              
              className
            )}
          />
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";