# Chart

A compound bar chart component built with SVG. Supports single and grouped bars, a hover tooltip with configurable position, dashed grid lines, and x-axis labels. All sub-components share data and state via React context.

## Import

```tsx
import {
  ChartContainer,
  BarChart,
  Bar,
  ChartTooltip,
} from "@/components/ui/chart/Chart";
```

## Basic Usage

Single bar chart with a tooltip.

```tsx
const data = [
  { label: "Jan", revenue: 400 },
  { label: "Feb", revenue: 300 },
  { label: "Mar", revenue: 500 },
  { label: "Apr", revenue: 200 },
];

<ChartContainer data={data} height={300}>
  <BarChart>
    <ChartTooltip />
    <Bar dataKey="revenue" />
  </BarChart>
</ChartContainer>;
```

## Grouped Bars

Add multiple `Bar` components with different `dataKey` values to render grouped bars side by side.

```tsx
const data = [
  { label: "Jan", revenue: 400, expenses: 240 },
  { label: "Feb", revenue: 300, expenses: 180 },
  { label: "Mar", revenue: 500, expenses: 320 },
];

<ChartContainer data={data} height={300}>
  <BarChart>
    <ChartTooltip />
    <Bar dataKey="revenue" color="fill-primary" />
    <Bar dataKey="expenses" color="fill-danger" />
  </BarChart>
</ChartContainer>;
```

## Tooltip Position

```tsx
<ChartContainer data={data}>
  <BarChart>
    <ChartTooltip position="bottom" />
    <Bar dataKey="revenue" />
  </BarChart>
</ChartContainer>
```

## Props

## ChartContainer

| Prop        | Type          | Default     | Description                                                                                 |
| ----------- | ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `data`      | `DataPoint[]` | Required    | Array of data objects. Each object must have a `label` string and one or more numeric keys. |
| `height`    | `number`      | `300`       | Total SVG height in pixels.                                                                 |
| `className` | `string`      | `undefined` | Adds custom classes to the outer container div.                                             |

`ChartContainer` also accepts all standard `div` props.

## BarChart

| Prop       | Type        | Default  | Description                                                     |
| ---------- | ----------- | -------- | --------------------------------------------------------------- |
| `children` | `ReactNode` | Required | `Bar` and `ChartTooltip` components to render inside the chart. |

## Bar

| Prop        | Type     | Default          | Description                                        |
| ----------- | -------- | ---------------- | -------------------------------------------------- |
| `dataKey`   | `string` | Required         | The key from each data object to read values from. |
| `color`     | `string` | `"fill-primary"` | Tailwind fill class for the bar color.             |
| `className` | `string` | `undefined`      | Adds custom classes to each bar rect element.      |

## ChartTooltip

| Prop       | Type                                     | Default | Description                                                          |
| ---------- | ---------------------------------------- | ------- | -------------------------------------------------------------------- |
| `enabled`  | `boolean`                                | `true`  | Shows or hides the tooltip entirely.                                 |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Controls which side of the hovered bar group the tooltip appears on. |

## Data Format

Each item in `data` must have a `label` field (used for the x-axis) plus one or more numeric fields matching the `dataKey` values passed to `Bar`.

```tsx
// Single series
{ label: "Jan", revenue: 400 }

// Multiple series (grouped bars)
{ label: "Jan", revenue: 400, expenses: 240, profit: 160 }
```

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-surface`
- `--color-border`
- `--color-fg`
- `--color-fg-muted`
- `--color-fg-subtle`
- `--color-inverse`
- `--color-fg-inverse`
- `--color-primary`
- `--z-popover`
- `--radius-lg`, `--radius-md`
- `--shadow-sm`, `--shadow-lg`

Bar colors are set via Tailwind fill classes on the `Bar` component. Use any `fill-*` utility class.

```tsx
<Bar dataKey="revenue" color="fill-primary" />
<Bar dataKey="expenses" color="fill-danger" />
<Bar dataKey="profit" color="fill-success" />
```

The chart container is `w-full` and adapts to its parent width. Control the height via the `height` prop on `ChartContainer`.

## Notes

- `ChartContainer` is a `"use client"` component and must run in the browser.
- `BarChart`, `Bar`, and `ChartTooltip` must all be rendered inside a `ChartContainer` — they read shared state via React context and will throw if used outside.
- `Bar` components auto-register their `dataKey` values on mount. The grid's y-axis maximum is calculated from all registered keys across all data points.
- Grouped bar widths are calculated automatically based on how many `Bar` components are registered.
- The SVG viewBox is fixed at `600` units wide and scales responsively via `w-full h-auto`.
- The y-axis renders 6 evenly spaced gridlines with dashed strokes. The scale is always `0` to `maxVal`.
- Hover detection is handled by transparent `rect` hitboxes drawn over each group column, not on the bars themselves.
- `ChartTooltip` is rendered outside the SVG as an absolutely positioned HTML element, so it supports full CSS styling.
