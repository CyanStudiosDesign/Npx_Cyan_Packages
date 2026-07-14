# Tooltip

A lightweight, accessible React tooltip component with four directional positions, built with Tailwind CSS and your design-system CSS variables.

---

## Preview

```
         ┌─────────────────┐
         │  Tooltip text   │   ← top (default)
         └────────┬────────┘
                  │
           [ Hover me ]
```

---

## Installation

Copy `Tooltip.tsx` into your project's component directory.

```bash
src/
└── components/
    └── Tooltip.tsx
```

No additional dependencies are required beyond React and Tailwind CSS.

---

## Usage

```tsx
import Tooltip from "@/components/Tooltip";

export default function Page() {
  return (
    <Tooltip tooltipText="Add to library">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

---

## Props

| Prop          | Type                                       | Default | Description                              |
|---------------|--------------------------------------------|---------|------------------------------------------|
| `children`    | `React.ReactNode`                          | —       | The trigger element wrapped by the tooltip |
| `tooltipText` | `string`                                   | —       | Text displayed inside the tooltip bubble |
| `position`    | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Which side of the trigger the tooltip appears on |
| `duration`    | `75 \| 100 \| 150 \| 200 \| 300 \| 500`   | `200`   | Transition duration in milliseconds |
| `className`   | `string`                                  | —       | Additional classes applied to the tooltip bubble |

---

## Position Variants

```tsx
<Tooltip tooltipText="Appears above"  position="top">    <button>Top</button>    </Tooltip>
<Tooltip tooltipText="Appears below"  position="bottom"> <button>Bottom</button> </Tooltip>
<Tooltip tooltipText="Appears left"   position="left">   <button>Left</button>   </Tooltip>
<Tooltip tooltipText="Appears right"  position="right">  <button>Right</button>  </Tooltip>
```

## Custom Duration

```tsx
<Tooltip tooltipText="Saved" duration={300}>
  <button>Hover me</button>
</Tooltip>
```

---

## Examples

### Icon toolbar

```tsx
import Tooltip from "@/components/Tooltip";
import { Heart, Share, Download } from "lucide-react";

export function Toolbar() {
  return (
    <div className="flex items-center gap-2">
      <Tooltip tooltipText="Like" position="top">
        <button><Heart size={18} /></button>
      </Tooltip>

      <Tooltip tooltipText="Share" position="top">
        <button><Share size={18} /></button>
      </Tooltip>

      <Tooltip tooltipText="Download" position="bottom">
        <button><Download size={18} /></button>
      </Tooltip>
    </div>
  );
}
```

### Info badge

```tsx
<Tooltip tooltipText="Billed every 30 days" position="left">
  <span className="cursor-default">ⓘ</span>
</Tooltip>
```

### CTA button

```tsx
<Tooltip tooltipText="Starts your 7-day free trial" position="top">
  <button className="btn-primary">Get started</button>
</Tooltip>
```

---

## Design Tokens

The component reads from your CSS design system. Ensure these variables are defined globally (e.g. in `globals.css`):

| Variable            | Role                          |
|---------------------|-------------------------------|
| `--color-border`    | Tooltip bubble border color   |
| `--color-inverse`   | Default tooltip background    |
| `--color-fg-inverse`| Default tooltip text color    |
| `--shadow-sm`       | Subtle drop shadow            |
| `--text-sm`         | Font size (`0.875rem`)        |
| `--font-medium`     | Font weight (`500`)           |
| `--z-popover`       | Z-index layer (`300`)         |

---

## Accessibility

- The tooltip `<div>` carries `role="tooltip"` so screen readers announce it correctly.
- The tooltip is purely visual on hover — for keyboard accessibility, consider pairing with `onFocus` / `onBlur` handlers on the trigger element:

```tsx
// Keyboard-accessible extension
<div
  className="relative inline-flex"
  onMouseEnter={() => setShow(true)}
  onMouseLeave={() => setShow(false)}
  onFocus={() => setShow(true)}
  onBlur={() => setShow(false)}
>
```

---


## Changelog

| Version | Change                                      |
|---------|---------------------------------------------|
| 1.1.0   | Added `position` prop with four variants    |
| 1.0.0   | Initial release with top-only tooltip       |
