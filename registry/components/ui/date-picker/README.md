# Date Picker

A shadcn-inspired date picker built on top of Cyan UI's `Calendar` component. It uses global design tokens, supports controlled and uncontrolled state, closes on outside click or Escape, and keeps keyboard focus visible.

## Import

```tsx
import { DatePicker } from "@/components/ui/date-picker";
```

## Usage

```tsx
export default function DatePickerDemo() {
  return <DatePicker placeholder="Select delivery date" />;
}
```

## Controlled

```tsx
"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export default function ControlledDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return <DatePicker value={date} onChange={setDate} />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date` | `undefined` | Controlled selected date. |
| `defaultValue` | `Date` | `undefined` | Initial uncontrolled selected date. |
| `onChange` | `(date: Date \| undefined) => void` | `undefined` | Called when a date is selected or cleared. |
| `placeholder` | `string` | `"Pick a date"` | Trigger text when no date is selected. |
| `disabled` | `boolean` | `false` | Disables trigger and selection. |
| `minDate` | `Date` | `undefined` | Prevents selecting dates before this date. |
| `maxDate` | `Date` | `undefined` | Prevents selecting dates after this date. |
| `weekStartsOn` | `0 \| 1` | `0` | Starts the calendar week on Sunday or Monday. |
| `showOutsideDays` | `boolean` | `true` | Shows adjacent month dates in the grid. |
| `dateFormat` | `Intl.DateTimeFormatOptions` | `{ month: "long", day: "numeric", year: "numeric" }` | Formats trigger display text. |
| `locale` | `string` | browser default | Locale used for formatting. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Popover alignment relative to trigger. |
| `closeOnSelect` | `boolean` | `false` | Closes the popover after selecting a date when enabled. |
| `clearable` | `boolean` | `true` | Shows a clear button when a date is selected. |
| `triggerClassName` | `string` | `undefined` | Classes for the trigger button. |
| `calendarClassName` | `string` | `undefined` | Classes forwarded to the inner Calendar. |

## Accessibility

- Trigger exposes `aria-haspopup="dialog"` and `aria-expanded`.
- Popover closes with Escape and outside click.
- Trigger and clear button use `focus-ring-visible`.
- Calendar handles day button semantics and disabled states.
