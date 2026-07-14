"use client";

import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface CommandContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  registerItem: (id: string, isVisible: boolean) => void;
  unregisterItem: (id: string) => void;
  visibleItemsCount: number;
}

interface CommandProps {
  children: ReactNode;
  open?: boolean; 
  onOpenChange?: (open: boolean) => void; 
  enableGlobalShortcut?: boolean; // <-- NEW PROP ADDED HERE
}
interface TriggerProps {
  children: ReactNode;
  className?: string;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
interface ListProps {
  children: ReactNode;
  className?: string;
}
interface GroupProps {
  children: ReactNode;
  heading?: string;
  className?: string;
}
interface ItemProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
  disabled?: boolean;
  keywords?: string[];
}
interface EmptyProps {
  children: ReactNode;
  className?: string;
}
interface ShortcutProps {
  children: ReactNode;
  className?: string;
}
interface SeparatorProps {
  className?: string;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

// ==========================================
// Custom Hook: useCommand()
// ==========================================
export const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context)
    throw new Error(
      "Command sub-components must be used within a <Command /> wrapper",
    );
  return context;
};

export function Command({ 
  children, 
  open, 
  onOpenChange, 
  enableGlobalShortcut = false 
}: CommandProps) {

  const [internalOpen, setInternalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItemsMap, setVisibleItemsMap] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
 
  const isOpen = open !== undefined ? open : internalOpen;

  const setIsOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    if (onOpenChange !== undefined) {
      const nextOpen = typeof value === "function" ? value(isOpen) : value;
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(value);
    }
  };

  const visibleItemsCount = Object.values(visibleItemsMap).filter(Boolean).length;

  const registerItem = (id: string, isVisible: boolean) => {
    setVisibleItemsMap((prev) => {
      if (prev[id] === isVisible) return prev;
      return { ...prev, [id]: isVisible };
    });
  };

  const unregisterItem = (id: string) => {
    setVisibleItemsMap((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!enableGlobalShortcut) return; 

    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, enableGlobalShortcut]); 
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setVisibleItemsMap({});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const childrenArray = React.Children.toArray(children);
  const triggerChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === CommandTrigger,
  );
  
  const modalContentChildren = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type === CommandTrigger),
  );

  return (
    <CommandContext.Provider
      value={{
        isOpen,
        setIsOpen,
        searchQuery,
        setSearchQuery,
        registerItem,
        unregisterItem,
        visibleItemsCount,
      }}
    >
      {triggerChild}

      {isOpen && (
        <div className="fixed inset-0 z-999 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div
            ref={containerRef}
            className="w-xs flex flex-col origin-top rounded-3xl bg-surface border-2 border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 p-4"
          >
            {modalContentChildren}
          </div>
        </div>
      )}
    </CommandContext.Provider>
  );
}

// ==========================================
// 2. Command Trigger Component
// ==========================================
export function CommandTrigger({ children, className = "" }: TriggerProps) {
  const { setIsOpen } = useCommand();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className={cn(
        "text-sm text-fg-muted bg-surface border border-border px-3 py-2 rounded-lg hover:bg-subtle transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

// ==========================================
// 3. Command Input
// ==========================================
export function CommandInput({
  className = "",
  placeholder = "Type a command or search...",
  ...props
}: InputProps) {
  const { searchQuery, setSearchQuery } = useCommand();
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-4xl px-2 pb-2.5",
        isSearching ? "mb-0" : "mb-0",
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-fg-subtle opacity-70" />
      <input
        {...props}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex w-full rounded-md text-sm text-fg placeholder:text-fg-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    </div>
  );
}

// ==========================================
// 4. Command List
// ==========================================
export function CommandList({ children, className = "" }: ListProps) {
  return (
    <div
      className={cn(
        "overflow-y-auto no-scrollbar overflow-x-hidden max-h-80",
        className,
      )}
      role="listbox"
    >
      {children}
    </div>
  );
}

// ==========================================
// 5. Command Group
// ==========================================
export function CommandGroup({
  children,
  heading,
  className = "",
}: GroupProps) {
  const { searchQuery } = useCommand();
  const shouldShowHeading = heading && !searchQuery.trim();

  return (
    <div
      className={cn(
        "overflow-hidden ",
        !searchQuery.trim() ? "py-1.5" : "py-0",
        className,
      )}
      role="group"
    >
      {shouldShowHeading && (
        <div className="px-2 py-1.5 text-xs font-bold text-fg-muted tracking-wider uppercase">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

// ==========================================
// 6. Command Item
// ==========================================
export function CommandItem({
  children,
  onSelect,
  className = "",
  disabled = false,
  keywords = [],
}: ItemProps) {
  const { setIsOpen, searchQuery, registerItem, unregisterItem } = useCommand();
  const itemIdRef = useRef(Math.random().toString(36).substring(2, 9));

  const matchesSearch = () => {
    if (!searchQuery) return true;
    const query = searchQuery.trim().toLowerCase();
    const childrenText = typeof children === "string" ? children : "";
    const textToSearch = [childrenText, ...keywords].join(" ").toLowerCase();
    return textToSearch.includes(query);
  };

  const isVisible = matchesSearch();

  useEffect(() => {
    registerItem(itemIdRef.current, isVisible);
    return () => unregisterItem(itemIdRef.current);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      disabled={disabled}
      role="option"
      onClick={() => {
        if (disabled) return;
        onSelect?.();
        setIsOpen(false);
      }}
      className={cn(
        "flex w-full items-center rounded-full justify-between px-3 py-2 text-sm text-fg transition-colors",
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:bg-subtle focus:bg-subtle focus:outline-none focus-ring-visible",
        className,
      )}
    >
      <div className="flex w-full items-center gap-2">{children}</div>
    </button>
  );
}

// ==========================================
// 7. Command Empty
// ==========================================
export function CommandEmpty({ children, className = "" }: EmptyProps) {
  const { searchQuery, visibleItemsCount } = useCommand();
  if (!searchQuery.trim() || visibleItemsCount > 0) return null;

  return (
    <div className={cn("text-center pt-3 text-sm text-fg-muted", className)}>
      {children}
    </div>
  );
}

// ==========================================
// 8. Command Shortcut
// ==========================================
export function CommandShortcut({ children, className = "" }: ShortcutProps) {
  return (
    <span
      className={cn(
        "ml-auto pl-4 text-xs tracking-widest text-fg-subtle font-mono opacity-80",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ==========================================
// 9. Command Separator (UPDATED)
// ==========================================
export function CommandSeparator({ className = "", alwaysVisible = false }: SeparatorProps & { alwaysVisible?: boolean }) {
  const { searchQuery } = useCommand();
  if (searchQuery.trim() && !alwaysVisible) return null;
  
  return <hr className={cn("-mx-4 my-1 border-t border-border/80", className)} />;
}