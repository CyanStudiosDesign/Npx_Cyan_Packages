# Breadcrumb Component

A lightweight, accessible, and composable Breadcrumb component built with React, TypeScript, Tailwind CSS, Radix Slot, and Lucide React.

The component follows a compound component architecture, allowing developers to create flexible breadcrumb navigation structures while maintaining accessibility, semantic HTML, and design-system consistency.

Ideal for dashboards, admin panels, documentation sites, e-commerce platforms, and multi-level application navigation.

---

# Features

* Compound Component Architecture
* Accessible Navigation Structure
* Semantic HTML Support
* Custom Link Support
* Radix Slot Integration
* Custom Separators
* Breadcrumb Ellipsis Support
* Current Page Highlighting
* Responsive Wrapping
* Dark Mode Support
* Design System Friendly
* TypeScript Support

---

# Installation

Required dependencies:

```bash
npm install @radix-ui/react-slot lucide-react
```

---

# Import

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
```

---

# Basic Usage

```tsx
<Breadcrumb>
  <BreadcrumbList>

    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbPage>
        Dashboard
      </BreadcrumbPage>
    </BreadcrumbItem>

  </BreadcrumbList>
</Breadcrumb>
```

---

# Complete Example

```tsx
<Breadcrumb>
  <BreadcrumbList>

    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbLink href="/products">
        Products
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbPage>
        MacBook Pro
      </BreadcrumbPage>
    </BreadcrumbItem>

  </BreadcrumbList>
</Breadcrumb>
```

---

# Component Structure

```tsx
<Breadcrumb>
  <BreadcrumbList>

    <BreadcrumbItem>
      <BreadcrumbLink />
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbPage />
    </BreadcrumbItem>

  </BreadcrumbList>
</Breadcrumb>
```

---

# Breadcrumb

Root navigation wrapper.

```tsx
<Breadcrumb>
  ...
</Breadcrumb>
```

Rendered as:

```html
<nav aria-label="breadcrumb">
```

Responsibilities:

* Accessibility
* Navigation Landmark
* Breadcrumb Container

---

# BreadcrumbList

Ordered list container.

```tsx
<BreadcrumbList>
  ...
</BreadcrumbList>
```

Rendered as:

```html
<ol>
```

Features:

* Flex Layout
* Wrapping Support
* Responsive Structure

Default styles:

```txt
flex
flex-wrap
items-center
gap-1.5
text-sm
```

---

# BreadcrumbItem

Represents a single breadcrumb segment.

```tsx
<BreadcrumbItem>
  ...
</BreadcrumbItem>
```

Rendered as:

```html
<li>
```

Responsibilities:

* Item Grouping
* Layout Consistency
* Semantic Structure

---

# BreadcrumbLink

Interactive breadcrumb link.

```tsx
<BreadcrumbLink href="/">
  Home
</BreadcrumbLink>
```

Rendered as:

```html
<a>
```

Features:

* Hover States
* Keyboard Accessible
* Semantic Navigation

---

## asChild Support

The component supports Radix Slot.

Example with Next.js:

```tsx
import Link from "next/link";

<BreadcrumbLink asChild>
  <Link href="/dashboard">
    Dashboard
  </Link>
</BreadcrumbLink>
```

Benefits:

* Works with Next.js Link
* Works with React Router
* Supports custom link components

---

# BreadcrumbPage

Represents the current page.

```tsx
<BreadcrumbPage>
  Dashboard
</BreadcrumbPage>
```

Rendered as:

```html
<span
  aria-current="page"
>
```

Features:

* Current Page Indicator
* Accessibility Support
* Active State Styling

Applied attributes:

```html
role="link"
aria-current="page"
aria-disabled="true"
```

---

# BreadcrumbSeparator

Separates breadcrumb items.

Default separator:

```tsx
<BreadcrumbSeparator />
```

Output:

```text
>
```

Internally uses:

```tsx
<ChevronRight />
```

---

## Custom Separator

```tsx
<BreadcrumbSeparator>
  /
</BreadcrumbSeparator>
```

Output:

```text
Home / Products / Details
```

---

### Another Example

```tsx
<BreadcrumbSeparator>
  →
</BreadcrumbSeparator>
```

Output:

```text
Home → Products → Details
```

---

# BreadcrumbEllipsis

Used when breadcrumb paths become too long.

```tsx
<BreadcrumbEllipsis />
```

Output:

```text
...
```

Internally uses:

```tsx
<MoreHorizontal />
```

---

## Example

```tsx
<Breadcrumb>
  <BreadcrumbList>

    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbEllipsis />

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbPage>
        Settings
      </BreadcrumbPage>
    </BreadcrumbItem>

  </BreadcrumbList>
</Breadcrumb>
```

Useful for:

* Deep Navigation Trees
* Documentation Sites
* File Explorers

---

# Responsive Behavior

The component supports wrapping.

```tsx
flex-wrap
```

Benefits:

* Mobile Friendly
* Prevents Overflow
* Better Long Path Handling

Example:

```text
Home > Products > Electronics >
Accessories > Wireless Devices
```

will wrap automatically when space becomes limited.

---

# Accessibility

The component includes:

```html
<nav aria-label="breadcrumb">
```

```html
aria-current="page"
```

```html
aria-disabled="true"
```

```html
aria-hidden="true"
```

Benefits:

* Screen Reader Support
* Semantic Navigation
* WCAG Friendly Structure

---

# Dark Mode Support

Includes built-in dark mode styling.

Examples:

```txt
dark:text-neutral-400
dark:text-neutral-100
dark:text-neutral-50
dark:text-neutral-600
```

Benefits:

* Theme Compatibility
* Consistent Design Language

---

# Design System Integration

Uses semantic utility classes and composition patterns.

Examples:

```txt
text-neutral-500
text-neutral-900
hover:text-neutral-900
```

Benefits:

* Consistent Styling
* Easy Theming
* Reusable Architecture

---

# Internal Architecture

The component is divided into several layers.

## Navigation Layer

```tsx
<Breadcrumb />
```

Handles:

* Landmark Navigation
* Accessibility

---

## Structure Layer

```tsx
<BreadcrumbList />
<BreadcrumbItem />
```

Handles:

* Layout
* Semantics

---

## Interaction Layer

```tsx
<BreadcrumbLink />
```

Handles:

* User Navigation
* Link Rendering

---

## State Layer

```tsx
<BreadcrumbPage />
```

Handles:

* Active Page Representation

---

## Utility Layer

```tsx
<BreadcrumbSeparator />
<BreadcrumbEllipsis />
```

Handles:

* Visual Separation
* Path Compression

---

