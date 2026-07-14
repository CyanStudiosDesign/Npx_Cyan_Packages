"use client";

import React, { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown-menu/DropDownMenu";

export interface CalendarProps {
  mode?: "single" | "multiple" | "range";
  value?: Date | Date[] | { from: Date; to?: Date };
  onChange?: (value: any) => void;
  defaultValue?: Date | Date[] | { from: Date; to?: Date };
  minDate?: Date;
  maxDate?: Date;
  showOutsideDays?: boolean;
  weekStartsOn?: 0 | 1;
  className?: string;
  classNames?: {
    months?: string;
    month_caption?: string;
    weekdays?: string;
    weekday?: string;
    grid?: string;
    day?: string;
    day_selected?: string;
    day_range_middle?: string;
    day_today?: string;
    day_outside?: string;
    day_disabled?: string;
  };
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const BASE_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (y: number, m: number) =>
  new Date(y, m + 1, 0).getDate();
const isSameDay = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};
const clearTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const Calendar = ({
  mode = "single",
  value: controlledValue,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  showOutsideDays = true,
  weekStartsOn = 0,
  className,
  classNames,
}: CalendarProps) => {
  // --- 1. Hybrid State Orchestration ---
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (mode === "range") return { from: undefined, to: undefined };
    if (mode === "multiple") return [];
    return undefined;
  });

  const value = isControlled ? controlledValue : internalValue;

  const [currentMonth, setCurrentMonth] = useState(() => {
    const initialDate = isControlled ? controlledValue : defaultValue;
    if (initialDate instanceof Date)
      return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
    if (
      initialDate &&
      typeof initialDate === "object" &&
      "from" in initialDate &&
      initialDate.from
    ) {
      return new Date(
        initialDate.from.getFullYear(),
        initialDate.from.getMonth(),
        1,
      );
    }
    return new Date();
  });

  const minDateTime = useMemo(
    () => (minDate ? clearTime(minDate).getTime() : null),
    [minDate],
  );
  const maxDateTime = useMemo(
    () =>
      maxDate
        ? new Date(
            maxDate.getFullYear(),
            maxDate.getMonth(),
            maxDate.getDate(),
            23,
            59,
            59,
            999,
          ).getTime()
        : null,
    [maxDate],
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthViewKey = `${year}-${month}`;

  // --- Dropdown Menu Lists Engine ---
  const yearsList = useMemo(() => {
    const startYear = minDate ? minDate.getFullYear() : year - 10;
    const endYear = maxDate ? maxDate.getFullYear() : year + 10;
    const arr = [];
    for (let y = startYear; y <= endYear; y++) {
      arr.push(y);
    }
    return arr;
  }, [minDate, maxDate, year]);

  const handleMonthSelect = (selectedMonthIndex: number) => {
    setCurrentMonth(new Date(year, selectedMonthIndex, 1));
  };

  const handleYearSelect = (selectedYear: number) => {
    setCurrentMonth(new Date(selectedYear, month, 1));
  };

  const updateValue = useCallback(
    (newValue: any) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const weekdays = useMemo(() => {
    return weekStartsOn === 1
      ? [...BASE_WEEKDAYS.slice(1), BASE_WEEKDAYS[0]]
      : BASE_WEEKDAYS;
  }, [weekStartsOn]);

  const days = useMemo(() => {
    const daysInCurrentMonth = getDaysInMonth(year, month);
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset =
      weekStartsOn === 1
        ? firstDayIndex === 0
          ? 6
          : firstDayIndex - 1
        : firstDayIndex;

    const calendarDays: {
      date: Date;
      isCurrentMonth: boolean;
      time: number;
    }[] = [];

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      calendarDays.push({ date: d, isCurrentMonth: false, time: d.getTime() });
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const d = new Date(year, month, i);
      calendarDays.push({ date: d, isCurrentMonth: true, time: d.getTime() });
    }

    const remainingCells = 42 - calendarDays.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let i = 1; i <= remainingCells; i++) {
      const d = new Date(nextYear, nextMonth, i);
      calendarDays.push({ date: d, isCurrentMonth: false, time: d.getTime() });
    }

    if (!showOutsideDays && calendarDays.length === 42) {
      const sixthRowOnlyOutside = calendarDays
        .slice(35, 42)
        .every((d) => !d.isCurrentMonth);
      if (sixthRowOnlyOutside) {
        return calendarDays.slice(0, 35);
      }
    }

    return calendarDays;
  }, [year, month, weekStartsOn, showOutsideDays]);

  const handleDayClick = useCallback(
    (date: Date, isCurrentMonthDay: boolean) => {
      if (!isCurrentMonthDay) {
        setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      }

      if (mode === "single") {
        updateValue(date);
      } else if (mode === "multiple") {
        const currentValues = Array.isArray(value) ? [...value] : [];
        const index = currentValues.findIndex((vDate) =>
          isSameDay(vDate, date),
        );
        if (index > -1) {
          currentValues.splice(index, 1);
        } else {
          currentValues.push(date);
        }
        updateValue(currentValues);
      } else if (mode === "range") {
        const range =
          value && typeof value === "object" && "from" in value
            ? { ...value }
            : { from: undefined, to: undefined };

        if (!range.from || (range.from && range.to)) {
          updateValue({ from: date, to: undefined });
        } else if (range.from && !range.to) {
          if (date < range.from) {
            updateValue({ from: date, to: undefined });
          } else {
            updateValue({ from: range.from, to: date });
          }
        }
      }
    },
    [mode, value, updateValue],
  );

  const todayTime = useMemo(() => clearTime(new Date()).getTime(), []);

  const rangeBounds = useMemo(() => {
    if (
      mode !== "range" ||
      !value ||
      Array.isArray(value) ||
      !("from" in value)
    )
      return null;
    return {
      fromTime: value.from ? clearTime(value.from).getTime() : null,
      toTime: value.to ? clearTime(value.to).getTime() : null,
    };
  }, [value, mode]);

  const prevMonthNav = useCallback(
    () => setCurrentMonth(new Date(year, month - 1, 1)),
    [year, month],
  );
  const nextMonthNav = useCallback(
    () => setCurrentMonth(new Date(year, month + 1, 1)),
    [year, month],
  );

  return (
    <div
      className={cn(
        "w-full max-w-sm p-4 sm:p-5 bg-surface rounded-2xl shadow-md border border-border select-none overflow-visible flex flex-col",
        className,
      )}
    >
      {/* Header Controls */}
      <div
        className={cn(
          "flex items-center justify-between mb-1 sm:mb-2 relative",
          classNames?.month_caption,
        )}
      >
        <button
          type="button"
          onClick={prevMonthNav}
          className="p-1 rounded-md text-fg-muted hover:bg-subtle transition-colors focus-ring-visible shrink-0 z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="inset-0 flex items-center justify-center gap-1 pointer-events-none">
          <div className="flex items-center pointer-events-auto min-w-0">
            {/* Month Menu Dropdown */}
            <Dropdown>
              <DropdownTrigger className="inline-flex items-center justify-center border-none bg-transparent hover:bg-transparent text-fg font-semibold text-sm sm:text-base rounded-md transition-colors pl-3 pr-1 py-0 shadow-none focus-ring-visible hover:underline truncate cursor-pointer">
                {MONTH_NAMES[month]}
              </DropdownTrigger>

              <DropdownContent className="absolute top-full mt-1 w-28 max-h-50 overflow-y-auto no-scrollbar z-50 border border-border bg-surface shadow-lg rounded-lg origin-top">
                {MONTH_NAMES.map((name, index) => (
                  <DropdownItem
                    key={name}
                    onClick={() => handleMonthSelect(index)}
                    className={cn(
                      "hover:bg-subtle text-fg-muted text-xs sm:text-sm cursor-pointer",
                      month === index &&
                        "bg-subtle font-semibold text-primary hover:bg-subtle",
                    )}
                  >
                    {name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            {/* Year Menu Dropdown */}
            <Dropdown>
              <DropdownTrigger className="inline-flex items-center justify-center border-none bg-transparent hover:bg-transparent text-fg font-semibold text-sm sm:text-base rounded-md transition-colors pl-1 pr-3 py-0 shadow-none tabular-nums focus-ring-visible hover:underline cursor-pointer shrink-0">
                {year}
              </DropdownTrigger>

              <DropdownContent className="absolute top-full mt-1 w-20 max-h-50 overflow-y-auto no-scrollbar z-50 border border-border bg-surface shadow-lg rounded-lg origin-top">
                {yearsList.map((y) => (
                  <DropdownItem
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    className={cn(
                      "hover:bg-subtle text-fg-muted tabular-nums text-xs sm:text-sm cursor-pointer",
                      year === y &&
                        "bg-subtle font-semibold text-primary hover:bg-subtle",
                    )}
                  >
                    {y}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>

        <button
          type="button"
          onClick={nextMonthNav}
          className="p-1 rounded-md text-fg-muted hover:bg-subtle transition-colors focus-ring-visible shrink-0 z-10"
        >
          <ChevronRight className="h-5 w-5" />{" "}
        </button>
      </div>

      {/* Weekdays Grid */}
      <div
        className={cn(
          "grid grid-cols-7 gap-1 text-center items-center justify-items-center",
          classNames?.weekdays,
        )}
      >
        {weekdays.map((day) => (
          <span
            key={day}
            className={cn(
              "text-[10px] sm:text-xs font-medium text-fg-subtle uppercase flex items-center justify-center w-full aspect-square",
              classNames?.weekday,
            )}
          >
            {day.slice(0, 2)}
          </span>
        ))}
      </div>

      {/* Animated Day Grid Container */}
      <div
        key={monthViewKey}
        className={cn(
          "grid grid-cols-7 gap-1 justify-items-center transition-all animate-in fade-in duration-200 slide-in-from-bottom-1",
          classNames?.grid,
        )}
      >
        {days.map(({ date, isCurrentMonth, time }) => {
          const current = time === todayTime;
          const disabled =
            (minDateTime !== null && time < minDateTime) ||
            (maxDateTime !== null && time > maxDateTime);

          let selected = false;
          let rangeMiddle = false;

          if (!disabled) {
            if (mode === "single" && value instanceof Date) {
              selected = time === clearTime(value).getTime();
            } else if (mode === "multiple" && Array.isArray(value)) {
              selected = value.some((v) => clearTime(v).getTime() === time);
            } else if (rangeBounds) {
              const { fromTime, toTime } = rangeBounds;
              selected = time === fromTime || time === toTime;
              rangeMiddle = !!(
                fromTime &&
                toTime &&
                time > fromTime &&
                time < toTime
              );
            }
          }

          if (!isCurrentMonth && !showOutsideDays) {
            return <div key={time} className="w-full aspect-square" />;
          }

          return (
            <button
              key={time}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(date, isCurrentMonth)}
              className={cn(
                "w-full aspect-square text-xs sm:text-sm rounded-lg flex items-center justify-center transition-all font-normal text-fg hover:bg-subtle relative focus-ring-visible max-w-10",

                !isCurrentMonth && "text-fg-subtle opacity-40",
                current && "border-2 border-primary font-semibold text-primary",
                rangeMiddle &&
                  "bg-primary/5 text-primary/70 rounded-lg hover:bg-info-subtle/80",
                selected &&
                  "bg-primary! text-primary-fg! font-semibold hover:bg-primary-hover shadow-sm rounded-lg",
                disabled &&
                  "text-fg-subtle cursor-not-allowed hover:bg-transparent line-through opacity-20 pointer-events-none",

                classNames?.day,
                selected && classNames?.day_selected,
                rangeMiddle && classNames?.day_range_middle,
                current && classNames?.day_today,
                !isCurrentMonth && classNames?.day_outside,
                disabled && classNames?.day_disabled,
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
