# Calendar

A fully featured date picker component supporting single date, multiple date, and date range selection. Includes month/year navigation via dropdown menus, min/max date constraints, and extensive class name customization.

## Import

```tsx
import { Calendar } from "@/components/ui/calendar/Calendar";
```

## Basic Usage

Uncontrolled single date picker — manages its own state internally.

```tsx
<Calendar />
```

## Controlled Usage

Pass `value` and `onChange` to control the selected date from outside.

```tsx
const [date, setDate] = useState<Date>();

<Calendar mode="single" value={date} onChange={(val) => setDate(val)} />;
```

## Multiple Date Selection

```tsx
const [dates, setDates] = useState<Date[]>([]);

<Calendar mode="multiple" value={dates} onChange={(val) => setDates(val)} />;
```

## Date Range Selection

```tsx
const [range, setRange] = useState<{ from: Date; to?: Date }>();

<Calendar mode="range" value={range} onChange={(val) => setRange(val)} />;
```

## With Min and Max Dates

```tsx
<Calendar
  mode="single"
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
/>
```

## Props

## Calendar

| Prop              | Type                                          | Default     | Description                                                                     |
| ----------------- | --------------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `mode`            | `"single" \| "multiple" \| "range"`           | `"single"`  | Selection mode.                                                                 |
| `value`           | `Date \| Date[] \| { from: Date; to?: Date }` | `undefined` | Controlled selected value. Type must match `mode`.                              |
| `onChange`        | `(value: any) => void`                        | `undefined` | Callback fired when the selected value changes.                                 |
| `defaultValue`    | `Date \| Date[] \| { from: Date; to?: Date }` | `undefined` | Initial value for uncontrolled usage.                                           |
| `minDate`         | `Date`                                        | `undefined` | Dates before this are disabled. Also sets the start of the year dropdown range. |
| `maxDate`         | `Date`                                        | `undefined` | Dates after this are disabled. Also sets the end of the year dropdown range.    |
| `showOutsideDays` | `boolean`                                     | `true`      | Shows days from the previous and next month in the grid.                        |
| `weekStartsOn`    | `0 \| 1`                                      | `0`         | Start of the week. `0` = Sunday, `1` = Monday.                                  |
| `className`       | `string`                                      | `undefined` | Adds custom classes to the outer calendar wrapper.                              |
| `classNames`      | `object`                                      | `undefined` | Per-element class overrides. See below.                                         |

## classNames

Use `classNames` to override styles on individual parts of the calendar.

| Key                | Element                                    |
| ------------------ | ------------------------------------------ |
| `months`           | Outer months container                     |
| `month_caption`    | Header row with month/year and nav buttons |
| `weekdays`         | Weekday label row                          |
| `weekday`          | Individual weekday label                   |
| `grid`             | Day grid container                         |
| `day`              | Every day button                           |
| `day_selected`     | Selected day(s)                            |
| `day_range_middle` | Days between range start and end           |
| `day_today`        | Today's date                               |
| `day_outside`      | Days outside the current month             |
| `day_disabled`     | Disabled days (outside min/max range)      |

```tsx
<Calendar
  classNames={{
    day_today: "border-2 border-primary",
    day_selected: "bg-primary text-primary-fg",
  }}
/>
```

## Selection Modes

Use `mode` to control how dates are selected.

```tsx
// Single — one date at a time
<Calendar mode="single" />

// Multiple — click to select, click again to deselect
<Calendar mode="multiple" />

// Range — first click sets start, second click sets end
<Calendar mode="range" />
```

Clicking an outside day in any mode navigates to that month automatically.

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-surface`
- `--color-border`
- `--color-fg`
- `--color-fg-muted`
- `--color-fg-subtle`
- `--color-subtle`
- `--color-primary`
- `--color-primary-fg`
- `--color-primary-hover`
- `--color-info-subtle`
- `--radius-lg`, `--radius-md`
- `--shadow-md`
- `focus-ring-visible`

The calendar is always `max-w-sm` and `w-full`. Wrap it in a container to control positioning.

```tsx
<div className="flex justify-center p-8">
  <Calendar mode="single" />
</div>
```

## Notes

- `Calendar` is a `"use client"` component and must run in the browser.
- The component is hybrid — it works both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`). If `value` is provided, internal state is bypassed entirely.
- The year dropdown range is `current year ± 10` by default. Pass `minDate` and `maxDate` to constrain it.
- `weekStartsOn={1}` shifts the grid so Monday is the first column.
- The grid always renders 42 cells (6 rows × 7 columns). If the 6th row contains only outside days and `showOutsideDays` is `false`, it is trimmed to 35 cells.
- Today's date is highlighted with a primary-colored border. It is independent of the selected state.
- Disabled days have `pointer-events-none` and a strikethrough style.
- The month/year header uses the `Dropdown`, `DropdownTrigger`, `DropdownContent`, and `DropdownItem` components from `@/components/ui/dropdown-menu/DropDownMenu`.
- `lucide-react` is required for the `ChevronLeft` and `ChevronRight` navigation icons.
