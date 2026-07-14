"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar/Calendar";

export type DatePickerAlign = "start" | "center" | "end";

export type DatePickerProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  weekStartsOn?: 0 | 1;
  showOutsideDays?: boolean;
  dateFormat?: Intl.DateTimeFormatOptions;
  locale?: string;
  align?: DatePickerAlign;
  closeOnSelect?: boolean;
  clearable?: boolean;
  triggerClassName?: string;
  calendarClassName?: string;
  triggerProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  minDate,
  maxDate,
  weekStartsOn = 0,
  showOutsideDays = true,
  dateFormat,
  locale,
  align = "start",
  closeOnSelect = false,
  clearable = true,
  className,
  triggerClassName,
  calendarClassName,
  triggerProps,
  ...props
}: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue
  );
  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalValue;
  const { onClick: triggerOnClick, ...restTriggerProps } = triggerProps ?? {};
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
        ...dateFormat,
      }),
    [dateFormat, locale]
  );
  const triggerLabel = selectedDate
    ? `Change date, selected ${formatter.format(selectedDate)}`
    : placeholder;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: globalThis.MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function updateDate(nextDate: Date | undefined) {
    if (!isControlled) {
      setInternalValue(nextDate);
    }

    onChange?.(nextDate);
  }

  function handleSelect(nextDate: Date | undefined) {
    updateDate(nextDate);

    if (closeOnSelect) {
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  function handleClear(event: ReactMouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    updateDate(undefined);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-flex w-72 max-w-full flex-col", className)}
      {...props}
    >
      <div
        className={cn(
          "flex h-10 w-full items-center rounded-radius border border-border bg-canvas shadow-sm transition-colors focus-within:border-border-strong hover:bg-subtle",
          disabled && "border-border-disabled bg-disabled text-fg-subtle",
          triggerClassName
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          {...restTriggerProps}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={triggerLabel}
          disabled={disabled}
          className={cn(
            "focus-ring-visible flex h-full min-w-0 flex-1 items-center gap-2 rounded-l-radius px-3 text-left text-sm text-fg transition-colors disabled:cursor-not-allowed disabled:text-fg-subtle",
            !selectedDate && "text-fg-muted"
          )}
          onClick={(event) => {
            triggerOnClick?.(event);
            if (!event.defaultPrevented) {
              setOpen((current) => !current);
            }
          }}
        >
          <CalendarIcon aria-hidden="true" className="size-4 shrink-0" />
          <span className="min-w-0 truncate">
            {selectedDate ? formatter.format(selectedDate) : placeholder}
          </span>
        </button>

        {selectedDate && clearable && !disabled ? (
          <button
            type="button"
            aria-label="Clear selected date"
            className="focus-ring-visible mr-0.5 grid size-7 shrink-0 place-items-center rounded-radius text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            onClick={handleClear}
          >
            <X aria-hidden="true" className="size-3" />
          </button>
        ) : null}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-label="Choose date"
          className={cn(
            "absolute top-full z-[var(--z-popover)] mt-2 w-72 rounded-radius border border-border bg-surface p-1 shadow-lg",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "end" && "right-0",
            align === "start" && "left-0"
          )}
        >
          <Calendar
            mode="single"
            value={selectedDate}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            weekStartsOn={weekStartsOn}
            showOutsideDays={showOutsideDays}
            className={cn(
              "w-full max-w-none border-0 shadow-none",
              calendarClassName
            )}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DatePicker;
