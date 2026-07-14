# ToggleChip Component

A reusable, accessible, and design-system-driven Toggle Chip component built with React, TypeScript, and Tailwind CSS.

The component provides a clean way to represent selectable filters, categories, tags, preferences, and multi-select UI interactions while maintaining full compatibility with modern design systems.

---

# Features

* Toggleable checked/unchecked state
* Multiple size variants
* Multiple visual variants
* Optional icon support
* Disabled state handling
* Accessibility support
* Design-system token integration
* Reusable and scalable architecture

---

# Installation

No external dependencies are required beyond React.

```bash
npm install react
```

---

# Import

```tsx
import ToggleChip from "@/components/ui/toggle-chip/ToggleChip";
```

---

# Basic Usage

```tsx
<ToggleChip
  ariaLabel="Technology"
  label="Technology"
/>
```

---

# Usage With Icon

```tsx
import { Laptop } from "lucide-react";

<ToggleChip
  ariaLabel="Technology"
  label="Technology"
  icon={<Laptop />}
/>
```

---

# Usage With Callback

```tsx
<ToggleChip
  ariaLabel="Technology"
  label="Technology"
  onChange={(checked) => {
    console.log(checked);
  }}
/>
```

---

# Multiple Toggle Chips

A common use case is rendering multiple chips for filtering or category selection.

```tsx
<div className="flex flex-wrap gap-3">
  <ToggleChip
    ariaLabel="Technology"
    label="Technology"
  />

  <ToggleChip
    ariaLabel="Finance"
    label="Finance"
  />

  <ToggleChip
    ariaLabel="Healthcare"
    label="Healthcare"
  />

  <ToggleChip
    ariaLabel="Education"
    label="Education"
  />
</div>
```

### Why This Pattern Works

Each ToggleChip manages its own internal state.

Benefits:

* Simple implementation
* Minimal parent logic
* Independent interactions
* Easy dashboard integration

---

# Controlled Group Example

For advanced filtering systems, state should be lifted to the parent.

```tsx
const [selected, setSelected] = useState<string[]>([]);

const toggleCategory = (category: string) => {
  setSelected((prev) =>
    prev.includes(category)
      ? prev.filter((item) => item !== category)
      : [...prev, category]
  );
};
```

This pattern is recommended when:

* Building filter systems
* Search interfaces
* Product categories
* Dashboard controls

---

# Props

```ts
interface ToggleChipProps {
  ariaLabel: string;
  label: string;
  icon?: ReactElement;
  size?: "sm" | "md" | "lg";
  variant?: "secondary" | "no_outline";
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}
```

---

# Size Variants

## Small

```tsx
size="sm"
```

Characteristics:

* Compact spacing
* Small icon size
* Best for dense layouts

---

## Medium

```tsx
size="md"
```

Default size.

Characteristics:

* Balanced spacing
* Suitable for most interfaces

---

## Large

```tsx
size="lg"
```

Characteristics:

* Increased padding
* Larger icon size
* Better touch targets

---

# Variant System

## Secondary Variant

```tsx
variant="secondary"
```

Appearance:

* Visible border
* Stronger chip structure
* Suitable for filter systems

Behavior:

Unchecked:

```txt
bg-transparent
border-border
text-fg
```

Checked:

```txt
bg-subtle
border-border
text-fg
```

---

## No Outline Variant

```tsx
variant="no_outline"
```

Appearance:

* Borderless design
* Minimal visual weight
* Modern lightweight styling

Behavior:

Unchecked:

```txt
bg-transparent
border-transparent
```

Checked:

```txt
bg-subtle
border-transparent
```

---

# Icon Architecture

Icons are injected using composition.

Example:

```tsx
icon={<Heart />}
```

Internally the component uses:

```tsx
cloneElement()
```

to dynamically apply:

* Size classes
* State styles
* Theme colors

Benefits:

* Works with any icon library
* No icon-specific implementation
* Highly reusable

---

# State Management

The component manages internal state using:

```tsx
const [checked, setChecked] = useState(defaultChecked);
```

This makes the component:

* Self-contained
* Easy to integrate
* Independent from parent state

Whenever state changes:

```tsx
onChange?.(newState);
```

is triggered.

This allows parent components to react to changes without controlling the component.

---

# Accessibility

The component includes:

```tsx
aria-label
```

and

```tsx
type="checkbox"
```

with a visually hidden input:

```tsx
className="sr-only"
```

Benefits:

* Screen reader compatibility
* Keyboard accessibility
* Better semantic HTML

---

# Design System Integration

The component relies on semantic tokens instead of hardcoded colors.

Examples:

```txt
bg-subtle
bg-disabled
border-border
text-fg
text-fg-muted
```

Advantages:

* Dark mode support
* Theme scalability
* Centralized styling
* Consistent design language

---

# Strengths

1. Configuration-driven architecture
2. Reusable icon system
3. Accessible implementation
4. Design-system friendly
5. Scalable variant management
6. Clean separation of concerns
7. Production-ready structure

---

