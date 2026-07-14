# Badge Component

A reusable, accessible, and design-system-friendly Badge component built with React, TypeScript, and Tailwind CSS.

The component supports multiple semantic variants, visual severities, optional icons, and flexible positioning, making it suitable for status indicators, labels, tags, notifications, and metadata displays.

---

# Features

- Multiple Semantic Variants
- Multiple Visual Styles
- Optional Icon Support
- Left & Right Icon Positioning
- Fully Customizable
- Design System Integration
- Tailwind CSS Friendly
- Accessible HTML Structure
- Reusable Component Architecture

---

# Installation

No external dependencies are required.

```bash
npm install react
```

---

# Import

```tsx
import Badge from "@/components/ui/badge/Badge";
```

---

# Basic Usage

```tsx
<Badge>Default Badge</Badge>
```

---

# Semantic Variants

The component supports five semantic variants.

## Neutral

```tsx
<Badge variant="neutral">Neutral</Badge>
```

Use Cases:

- Generic Labels
- Categories
- Metadata

---

## Success

```tsx
<Badge variant="success">Active</Badge>
```

Use Cases:

- Success Messages
- Completed Tasks
- Verified Status

---

## Warning

```tsx
<Badge variant="warning">Pending</Badge>
```

Use Cases:

- Pending Reviews
- Warnings
- Attention Required

---

## Error

```tsx
<Badge variant="error">Failed</Badge>
```

Use Cases:

- Failed Operations
- Errors
- Critical States

---

## Info

```tsx
<Badge variant="info">New Feature</Badge>
```

Use Cases:

- Announcements
- Updates
- Informational Labels

---

# Visual Severities

The component separates semantic meaning from visual appearance.

## Solid

```tsx
<Badge variant="success" severity="solid">
  Active
</Badge>
```

Characteristics:

- Strong emphasis
- Filled background
- High visibility

---

## Subtle

```tsx
<Badge variant="success" severity="subtle">
  Active
</Badge>
```

Characteristics:

- Soft appearance
- Dashboard friendly
- Default style

---

## Outline

```tsx
<Badge variant="success" severity="outline">
  Active
</Badge>
```

Characteristics:

- Transparent background
- Minimal visual weight
- Clean modern appearance

---

# Icon Support

The Badge component supports custom icons.

## Left Icon

```tsx
import { Check } from "lucide-react";

<Badge variant="success" icon={<Check size={14} />}>
  Verified
</Badge>;
```

---

## Right Icon

```tsx
import { ArrowRight } from "lucide-react";

<Badge variant="info" icon={<ArrowRight size={14} />} iconPosition="right">
  Learn More
</Badge>;
```

---

# Multiple Usage Examples

## Status Badges

```tsx
<div className="flex gap-2">
  <Badge variant="success">Active</Badge>

  <Badge variant="warning">Pending</Badge>

  <Badge variant="error">Failed</Badge>
</div>
```

---

## User Profile Labels

```tsx
<div className="flex gap-2">
  <Badge variant="info">Premium</Badge>

  <Badge variant="success">Verified</Badge>
</div>
```

---

## Product Tags

```tsx
<div className="flex gap-2">
  <Badge variant="info">New</Badge>

  <Badge variant="warning">Limited</Badge>

  <Badge variant="success">Bestseller</Badge>
</div>
```

---

## Notification Indicators

```tsx
<Badge variant="error" severity="solid">
  5 New Alerts
</Badge>
```

---

---

## Using Spinner Component

```tsx
<Badge
  variant="warning"
  size="md"
  icon={<Spinner size="md" thickness="lg" color="#f97316" />}
  className="bg-warning-subtle dark:bg-warning-subtle/30 text-warning-strong border border-warning/20 font-semibold shadow-sm"
>
  In Review
</Badge>
```

---

# Props

```ts
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;

  variant?: "success" | "warning" | "error" | "info" | "neutral";

  severity?: "solid" | "subtle" | "outline";

  icon?: React.ReactNode;

  iconPosition?: "left" | "right";
}
```

---

# Architecture Analysis

## Variant System

The component uses a centralized configuration object.

```tsx
const variantStyles = {
  ...
}
```

Benefits:

- Single source of truth
- Easier maintenance
- Better scalability
- Cleaner component logic

Instead of:

```tsx
if (variant === "success")
```

styles are resolved automatically.

---

## Severity Layer

The component separates:

```txt
Semantic Meaning
```

from

```txt
Visual Appearance
```

Example:

```tsx
variant = "success";
severity = "outline";
```

This provides significantly more flexibility than coupling both concepts together.

---

## Icon Architecture

Icons are injected through composition.

```tsx
icon={<Check />}
```

Benefits:

- Works with any icon library
- No dependency on a specific icon package
- Fully reusable

Supported libraries:

- Lucide React
- Heroicons
- Custom SVGs
- Custom React Components

---

# Accessibility

The component uses:

```html
<span></span>
```

as a semantic label container.

Benefits:

- Lightweight
- Accessible
- Suitable for inline usage

Because the component extends:

```tsx
React.HTMLAttributes<HTMLSpanElement>;
```

developers can add:

```tsx
aria-label
title
data-*
role
```

and other accessibility attributes.

---

# Design System Integration

The component relies on semantic design tokens.

Examples:

```txt
bg-success
bg-info
bg-danger

text-success-strong
text-info-strong

border-success
border-danger
```

Benefits:

- Theme support
- Dark mode compatibility
- Consistent UI language
- Centralized design control

---

# Strengths

1. Variant-driven architecture
2. Multiple visual severities
3. Icon support
4. Flexible positioning
5. Design-system friendly
6. Accessible structure
7. Easy to scale
8. Production-ready organization

---
