# Drawer

A compound drawer component with support for four sides, drag-to-dismiss, smooth animations, and backdrop click to close. Built across four files with shared state via React context.

## Import

```tsx
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
```

## Basic Usage

Bottom drawer (default).

```tsx
<Drawer>
  <DrawerTrigger>
    <button>Open Drawer</button>
  </DrawerTrigger>
  <DrawerContent>
    <h2>Drawer Title</h2>
    <p>Any content goes here.</p>
  </DrawerContent>
</Drawer>
```

## Side Variants

Pass a `side` prop to `Drawer` to control which edge the drawer slides in from.

```tsx
// Bottom (default)
<Drawer side="bottom">...</Drawer>

// Top
<Drawer side="top">...</Drawer>

// Right
<Drawer side="right">...</Drawer>

// Left
<Drawer side="left">...</Drawer>
```

## Props

## Drawer

| Prop       | Type                                     | Default    | Description                                     |
| ---------- | ---------------------------------------- | ---------- | ----------------------------------------------- |
| `children` | `ReactNode`                              | Required   | `DrawerTrigger` and `DrawerContent` components. |
| `side`     | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | The edge the drawer slides in from.             |

## DrawerTrigger

| Prop       | Type        | Default  | Description                                                                  |
| ---------- | ----------- | -------- | ---------------------------------------------------------------------------- |
| `children` | `ReactNode` | Required | The element that opens the drawer on click. Wrapped in an `inline-flex` div. |

## DrawerContent

| Prop       | Type        | Default  | Description                               |
| ---------- | ----------- | -------- | ----------------------------------------- |
| `children` | `ReactNode` | Required | Content rendered inside the drawer panel. |

## Close Behavior

The drawer can be closed in two ways — clicking the backdrop overlay, or dragging the handle past the dismiss threshold.

```tsx
// Backdrop — clicking anywhere outside the panel
<div onClick={() => setOpen(false)} className="absolute inset-0 ..." />;

// Drag to dismiss — drag more than 100px in the closing direction
if (absOffset > 100) setOpen(false);
```

Dragging in the wrong direction (e.g. dragging a bottom drawer upward) has no effect.

## Drag Direction per Side

| Side     | Drag direction to dismiss |
| -------- | ------------------------- |
| `bottom` | Drag down                 |
| `top`    | Drag up                   |
| `right`  | Drag right                |
| `left`   | Drag left                 |

Both mouse and touch events are supported.

## Panel Dimensions

| Side     | Panel size                                          |
| -------- | --------------------------------------------------- |
| `bottom` | `w-full`, max height `85vh`, rounded top corners    |
| `top`    | `w-full`, max height `85vh`, rounded bottom corners |
| `left`   | `h-full`, `w-full sm:w-96`, border on right         |
| `right`  | `h-full`, `w-full sm:w-96`, border on left          |

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-surface`
- `--color-border`
- `--color-subtle`
- `--shadow-2xl`

The drag handle bar and backdrop use `bg-subtle/80` and `bg-black/40` respectively. Animations use `cubic-bezier(0.32, 0.94, 0.6, 1)` with a `400ms` duration. Transitions are paused during active drag.

```tsx
// To change the side panel width (left/right drawers)
className = "h-full w-full sm:w-96 ...";

// To change the max height (top/bottom drawers)
className = "w-full max-h-[85vh] ...";
```

## File Structure

```
drawer/
├── Drawer.tsx         // Root wrapper, passes side to DrawerProvider
├── DrawerContext.tsx  // Shared state via React context
├── DrawerContent.tsx  // Animated panel with drag handling
├── DrawerTrigger.tsx  // Click target to open the drawer
└── index.ts           // Re-exports all public components
```

## Notes

- All drawer components are `"use client"` and must run in the browser.
- `DrawerTrigger` and `DrawerContent` must be rendered inside a `<Drawer>` wrapper — they consume context via `useDrawer()` and will throw if used outside.
- When the drawer is open, `document.body` overflow is set to `hidden` to prevent background scrolling. It is restored on close.
- The panel mounts into the DOM when the drawer opens and unmounts `400ms` after it closes, matching the exit animation duration.
- `DrawerTrigger` wraps its children in an `inline-flex` div. If you need a different display context, wrap it yourself or adjust the class directly.
- Content inside `DrawerContent` is rendered in a scrollable `flex-1 overflow-y-auto p-6` container.
- The `cn()` utility from `@/lib/utils` is required.
