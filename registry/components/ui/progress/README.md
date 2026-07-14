# Progress

A lightweight animated progress bar component built with React and Tailwind CSS.

## Preview

```txt
[████████████████████░░░░░░░░░░░░░░] 66%
```

---

## File Structure

```txt
progress/
├── Progress.tsx
├── ProgressDemo.tsx
└── README.md
```

---

## Installation

Copy the `progress` folder into your project.

```txt
src/
└── components/
    └── ui/
        └── progress/
            ├── Progress.tsx
            ├── ProgressDemo.tsx
            └── README.md
```

---

## Usage

### Basic

```tsx
import { Progress } from "./Progress";

export default function Example() {
  return <Progress value={50} />;
}
```

### Custom Width

```tsx
<Progress
  value={75}
  className="w-full"
/>
```

### Custom Width and Height

```tsx
<Progress
  value={40}
  className="w-96 h-2"
/>
```

---

## Demo Component

The package includes a demo component that animates the progress value.

```tsx
import { ProgressDemo } from "./ProgressDemo";

export default function Example() {
  return <ProgressDemo />;
}
```

### Demo Behavior

The demo:

- Starts at `13`
- Waits `500ms`
- Updates to `66`
- Smoothly animates using CSS transitions

---

## Props

### Progress

| Prop | Type | Required | Description |
|--------|--------|----------|-------------|
| value | number | Yes | Progress value between 0 and 100 |
| className | string | No | Additional classes applied to the container |

---

## Examples

### 0%

```tsx
<Progress value={0} />
```

### 25%

```tsx
<Progress value={25} />
```

### 50%

```tsx
<Progress value={50} />
```

### 75%

```tsx
<Progress value={75} />
```

### 100%

```tsx
<Progress value={100} />
```

---

## Registry Example

```tsx
{
  id: "progress",
  name: "Progress",
  category: "UI",
  preview: <ProgressDemo />,
}
```

Using `ProgressDemo` in your registry provides a live preview of the component animation.

---

## Implementation Notes

- Built with React and Tailwind CSS.
- Uses CSS `transform: translateX()` for animation.
- Uses `transition-all duration-300` for smooth updates.
- The outer container is styled using Tailwind utility classes.
- Supports custom styling through the `className` prop.
- Recommended value range: `0–100`.

## Dependencies

```tsx
import { cn } from "@/lib/utils";
```

The component uses the `cn()` utility to merge default and custom class names.