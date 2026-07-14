# Range Slider Component

A fully composable, accessible, and customizable Range Slider component built with React, TypeScript, and Tailwind CSS.

Unlike traditional slider libraries, this implementation follows a compound component architecture, giving complete control over layout, styling, behavior, and interaction while maintaining a clean API.

---

# Features

* Single Value Slider Support
* Dual Thumb Range Selection
* Compound Component Architecture
* Click-to-Set Value
* Drag-and-Drop Interaction
* Touch Device Support
* Disabled State Support
* Custom Color Scheme
* Configurable Min, Max, and Step
* Accessibility Support
* Design System Integration

---

# Component Structure

The slider is composed using separate building blocks:

```tsx
<RangeSlider>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

This architecture provides complete flexibility while keeping logic centralized.

---

# Import

```tsx
import {
  RangeSlider,
  RangeSliderContent,
  RangeSliderThumb,
} from "@/components/ui/range-slider";
```

---

# Basic Usage

## Single Value Slider

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultValue={[50]}
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
</RangeSlider>
```

---

## Range Selection Slider

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultValue={[20, 80]}
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

---

# Props

## RangeSlider

| Prop         | Type                    | Default              |
| ------------ | ----------------------- | -------------------- |
| min          | number                  | 0                    |
| max          | number                  | 100                  |
| step         | number                  | 1                    |
| defaultValue | number[]                | [20, 80]             |
| colorScheme  | string                  | var(--color-primary) |
| disabled     | boolean                 | false                |
| onChange     | (values:number) => void | undefined            |

---

# RangeSliderContent

| Prop      | Type   | Default               |
| --------- | ------ | --------------------- |
| className | string | Default Track Styling |

---

# RangeSliderThumb

| Prop      | Type   |
| --------- | ------ |
| index     | 0 | 1  |
| className | string |

---

# Single Thumb Example

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultValue={[30]}
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
</RangeSlider>
```

Use Cases:

* Volume Controls
* Brightness Controls
* Percentage Inputs
* Rating Systems

---

# Dual Thumb Example

```tsx
<RangeSlider
  min={0}
  max={1000}
  step={10}
  defaultValue={[200, 800]}
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

Use Cases:

* Price Filters
* Salary Filters
* Age Ranges
* Search Filters

---

# Disabled State

The slider fully supports disabled mode.

```tsx
<RangeSlider
  disabled
  defaultValue={[20, 80]}
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

Disabled Behavior:

* Dragging disabled
* Clicking disabled
* Touch interactions disabled
* Keyboard focus removed
* Visual disabled state applied

Applied styles:

```txt
opacity-50
pointer-events-none
cursor-not-allowed
```

---

# Custom Color Scheme

The active track and thumbs can use any color.

```tsx
<RangeSlider
  colorScheme="#3b82f6"
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

Or:

```tsx
<RangeSlider
  colorScheme="var(--color-success)"
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

---

# Step Configuration

```tsx
<RangeSlider
  min={0}
  max={100}
  step={5}
>
  <RangeSliderContent />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

Benefits:

* Predictable values
* Better filtering systems
* Improved form consistency

---

# Click-to-Set Interaction

Users can click directly on the track.

```txt
User Clicks Track
       ↓
Closest Thumb Selected
       ↓
Thumb Moves To Position
```

This creates a much smoother UX than dragging only.

---

# Drag System

Dragging is implemented using global listeners.

```tsx
mousemove
mouseup
touchmove
touchend
```

Benefits:

* Smooth dragging
* Works outside slider bounds
* Consistent desktop experience
* Mobile support included

---

# Touch Support

The component supports:

```txt
touchstart
touchmove
touchend
```

Benefits:

* Mobile compatibility
* Tablet support
* Touch-first interaction

---

# Range Protection

When using two thumbs:

```txt
Minimum Thumb
cannot cross
Maximum Thumb
```

Example:

```txt
20 ───────── 80
```

The minimum thumb cannot exceed the maximum thumb.

The maximum thumb cannot go below the minimum thumb.

This prevents invalid ranges.

---

# Accessibility

The slider includes:

```tsx
role="slider"
aria-valuenow
aria-disabled
```

Benefits:

* Better screen reader support
* Improved accessibility compliance
* Semantic interaction model

---

# Context Architecture

The component uses React Context to share:

```tsx
min
max
step
values
disabled
colorScheme
trackRef
```

Benefits:

* No prop drilling
* Cleaner APIs
* Better maintainability
* Easier scalability

---

# Internal Architecture

The implementation is divided into three layers:

### 1. Root Provider

```tsx
<RangeSlider />
```

Responsibilities:

* State Management
* Drag Logic
* Value Calculations
* Context Distribution

---

### 2. Track Layer

```tsx
<RangeSliderContent />
```

Responsibilities:

* Track Rendering
* Active Range Rendering
* Click Detection

---

### 3. Thumb Layer

```tsx
<RangeSliderThumb />
```

Responsibilities:

* Drag Interaction
* Position Rendering
* Accessibility

---

# Design System Integration

Uses semantic design tokens:

```txt
--color-primary
--color-muted
--z-base
```

Benefits:

* Theme Support
* Dark Mode Compatibility
* Consistent Styling
* Centralized Design Control

---

# Strengths

1. Compound Component Architecture
2. Single & Dual Thumb Support
3. Touch Device Compatibility
4. Click-to-Set Behavior
5. Disabled State Support
6. Custom Color Schemes
7. Accessibility Features
8. Range Protection Logic
9. Design-System Friendly
10. Production-Ready Foundation

---