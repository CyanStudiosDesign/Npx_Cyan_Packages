# Spinner Component

A customizable, accessible, and design-system-friendly loading spinner built with React, TypeScript, and SVG.

Unlike traditional CSS border spinners, this component uses a handcrafted SVG loader that provides better visual control, smoother scaling, and custom icon support.

---

# Features

* Multiple size presets
* Custom pixel sizing
* Multiple thickness presets
* Custom thickness support
* Adjustable animation speed
* Custom color support
* Optional loading label
* Custom icon spinner support
* Accessibility support
* Design-system integration

---

# Installation

No additional dependencies are required.

```bash
npm install react
```

---

# Import

```tsx
import Spinner from "@/components/ui/spinner/Spinner";
```

---

# Basic Usage

```tsx
<Spinner />
```

This renders the default spinner using:

* size = "md"
* thickness = "md"
* speed = "normal"

---

# With Loading Label

```tsx
<Spinner
  label="Loading data..."
/>
```

Output:

Loading Spinner + Text

This is recommended whenever loading may take longer than a second.

---

# Custom Size

## Preset Sizes

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
```

### Size Mapping

| Size | Pixels |
| ---- | ------ |
| sm   | 16px   |
| md   | 24px   |
| lg   | 40px   |
| xl   | 54px   |

---

## Custom Pixel Size

```tsx
<Spinner size={80} />
```

This allows any arbitrary size.

Examples:

```tsx
<Spinner size={32} />
<Spinner size={72} />
<Spinner size={120} />
```

---

# Thickness Control

## Preset Thickness

```tsx
<Spinner thickness="sm" />
<Spinner thickness="md" />
<Spinner thickness="lg" />
<Spinner thickness="xl" />
```

### Thickness Mapping

| Thickness | Stroke Width |
| --------- | ------------ |
| sm        | 1.5          |
| md        | 2            |
| lg        | 3            |
| xl        | 4            |

---

## Custom Thickness

```tsx
<Spinner thickness={5} />
```

Useful when creating larger loaders.

---

# Animation Speed

## Normal

```tsx
<Spinner speed="normal" />
```

Default speed.

---

## Medium

```tsx
<Spinner speed="medium" />
```

Faster rotation.

---

## Fast

```tsx
<Spinner speed="fast" />
```

Fastest available animation speed.

---

# Custom Color

```tsx
<Spinner color="#3B82F6" />
```

or

```tsx
<Spinner color="red" />
```

or

```tsx
<Spinner color="var(--color-primary)" />
```

---

# Custom Icon Spinner

The component supports replacing the default SVG loader with any React node.

Example:

```tsx
import { RefreshCw } from "lucide-react";

<Spinner
  icon={<RefreshCw />}
/>
```

The icon automatically inherits:

* Spinner sizing
* Animation rotation
* Current text color

---

# Multiple Usage Examples

## Button Loading State

```tsx
<button disabled>
  <Spinner size="sm" />
  Saving...
</button>
```

---

## Page Loader

```tsx
<div className="flex items-center justify-center min-h-screen">
  <Spinner
    size="xl"
    label="Loading application..."
  />
</div>
```

---

## Data Fetching

```tsx
<Spinner
  size="lg"
  label="Fetching users..."
/>
```

---

## Card Skeleton Replacement

```tsx
<div className="h-40 flex items-center justify-center">
  <Spinner />
</div>
```

---

# Component Props

```ts
interface SpinnerProps {
  size?: number | "sm" | "md" | "lg" | "xl";
  color?: string;
  thickness?: number | "sm" | "md" | "lg" | "xl";
  ariaLabel?: string;
  label?: string;
  icon?: ReactNode;
  speed?: "normal" | "medium" | "fast";
}
```

---

# Architecture Analysis

## 1. Size System

The component uses a centralized size configuration:

```tsx
const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 40,
  xl: 54,
};
```

Benefits:

* Consistent sizing
* Easy maintenance
* Scalable configuration

---

## 2. Thickness System

The spinner stroke width is controlled independently.

```tsx
const THICKNESS_MAP = {
  sm: 1.5,
  md: 2,
  lg: 3,
  xl: 4,
};
```

This separation allows:

* Small thick loaders
* Large thin loaders
* Complete visual flexibility

---

## 3. Animation System

Animation speed is abstracted through configuration.

```tsx
const speedTimes = {
  fast: "...",
  medium: "...",
  normal: "...",
};
```

Benefits:

* Cleaner API
* No duplicated animation classes
* Easy future extension

---

## 4. SVG-Based Rendering

Unlike border-based spinners:

```css
border-top-color: transparent;
```

This component renders a handcrafted SVG.

Advantages:

* Crisp rendering
* Better scaling
* Customizable stroke widths
* More consistent appearance

---

## 5. Custom Icon Architecture

The component accepts:

```tsx
icon?: ReactNode
```

This allows:

* Lucide icons
* Heroicons
* Custom SVGs
* Brand loaders

without modifying the component itself.

---

# Accessibility

The component includes:

```tsx
role="status"
```

and

```tsx
aria-label
```

Benefits:

* Screen reader compatibility
* Better accessibility compliance
* Improved loading-state communication

---

# Design System Integration

The component uses semantic classes:

```txt
text-fg
text-fg-muted
font-sans
```

Advantages:

* Dark mode compatibility
* Theme scalability
* Consistent typography

---
