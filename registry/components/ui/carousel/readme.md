# Carousel Component

A fully customizable, responsive, and accessible Carousel component built with React, TypeScript, Tailwind CSS, and Context API.

The component supports multi-slide layouts, autoplay, drag interactions, keyboard navigation, custom indicators, and smooth animated transitions without relying on external carousel libraries.

Designed for design systems, testimonials, product showcases, galleries, dashboards, and modern web applications.

---

# Features

* Compound Component Architecture
* Multi-Slide Support
* Custom Slides Per View
* Custom Scroll Strides
* Drag & Swipe Support
* Touch Device Support
* Keyboard Navigation
* Autoplay Support
* Pause on Hover
* Play / Pause Controls
* Multiple Navigation Styles
* Multiple Indicator Types
* Smooth LERP Animations
* Responsive Layout
* Accessibility Support
* Design System Friendly

---

# Installation

Required dependency:

```bash
npm install lucide-react
```

---

# Import

```tsx
import { Carousel } from "@/components/ui/carousel/Carousel";
```

---

# Basic Usage

```tsx
<Carousel
  slides={slides}
/>
```

By default:

```tsx
perView={1}
scrollBy={1}
```

---

# Example Usage

```tsx
<Carousel
  slides={dummySlides}
  perView={3}
  scrollBy={3}
  gap={16}
  navStyle="outside"
  indicator="dots"
  autoplay
  interval={3000}
/>
```

---

# Slides

Slides are passed as an array of React nodes.

```tsx
const slides = [
  <Card>Slide 1</Card>,
  <Card>Slide 2</Card>,
  <Card>Slide 3</Card>,
];

<Carousel slides={slides} />
```

---

# Slides Per View

Controls how many slides are visible.

## Single Slide

```tsx
<Carousel
  slides={slides}
  perView={1}
/>
```

---

## Three Slides

```tsx
<Carousel
  slides={slides}
  perView={3}
/>
```

---

## Four Slides

```tsx
<Carousel
  slides={slides}
  perView={4}
/>
```

---

# Scroll By

Controls how many slides move at once.

## Move One Slide

```tsx
scrollBy={1}
```

---

## Move Three Slides

```tsx
scrollBy={3}
```

Useful for:

* Testimonials
* Product Grids
* Team Showcases

---

# Gap Between Slides

```tsx
<Carousel
  gap={16}
/>
```

Controls spacing between slides.

Example:

```tsx
gap={8}
gap={16}
gap={24}
gap={32}
```

---

# Navigation Styles

## Outside Navigation

```tsx
navStyle="outside"
```

Output:

```text
←  [ Carousel ]  →
```

---

## Inside Navigation

```tsx
navStyle="inside"
```

Output:

```text
[ ← Carousel → ]
```

---

## No Navigation

```tsx
navStyle="none"
```

Navigation buttons are hidden.

---

# Indicator Types

The component supports multiple indicator styles.

---

## Dots

```tsx
indicator="dots"
```

Output:

```text
● ○ ○ ○
```

---

## Numbers

```tsx
indicator="numbers"
```

Output:

```text
1 / 4
```

---

## Progress Bar

```tsx
indicator="progress"
```

Output:

```text
████████░░░░░░░░
```

---

## None

```tsx
indicator="none"
```

No indicators rendered.

---

# Autoplay

Enable automatic slide progression.

```tsx
<Carousel
  autoplay
/>
```

---

## Autoplay Interval

```tsx
<Carousel
  autoplay
  interval={3000}
/>
```

Value:

```text
Milliseconds
```

Example:

```tsx
interval={2000}
interval={3000}
interval={5000}
```

---

# Pause On Hover

When autoplay is enabled:

```tsx
onMouseEnter
```

automatically pauses autoplay.

```tsx
onMouseLeave
```

resumes autoplay.

Benefits:

* Better readability
* Better UX
* Prevents accidental skipping

---

# Autoplay Controls

An autoplay toggle button is automatically rendered.

States:

```text
▶ Play
```

```text
⏸ Pause
```

Users can manually start or stop autoplay.

---

# Drag & Swipe Support

Desktop:

```text
Mouse Drag
```

Mobile:

```text
Touch Swipe
```

Supported events:

```tsx
onMouseDown
onMouseMove
onMouseUp
```

```tsx
onTouchStart
onTouchMove
onTouchEnd
```

Benefits:

* Mobile Friendly
* Natural Interactions
* Modern UX

---

# Keyboard Navigation

Built-in keyboard support.

Keys:

```text
← ArrowLeft
```

Previous slide

```text
→ ArrowRight
```

Next slide

Implementation:

```tsx
onKeyDown
```

Benefits:

* Better accessibility
* Faster navigation
* Keyboard-friendly UX

---

# Animation System

The carousel uses linear interpolation (LERP).

```tsx
LERP(
  current,
  target,
  speedFactor
)
```

instead of CSS transitions.

Benefits:

* Smooth motion
* Natural momentum
* Better control

---

# Speed Factor

Controls animation smoothness.

```tsx
speedFactor={0.08}
```

Lower values:

```text
Smoother
Slower
```

Higher values:

```text
Faster
Snappier
```

---

# Accessibility

The component includes:

```tsx
role="region"
aria-roledescription="carousel"
```

Slides include:

```tsx
role="group"
aria-roledescription="slide"
```

Navigation buttons include:

```tsx
aria-label
```

Benefits:

* Screen reader support
* Better accessibility
* Semantic structure

---

# Responsive Design

Uses:

```tsx
w-full
overflow-hidden
```

and dynamic slide width calculations.

Benefits:

* Mobile support
* Tablet support
* Desktop support
* Fluid resizing

---

# Internal Architecture

The component is divided into several layers.

## Container Layer

```tsx
<Carousel />
```

Responsibilities:

* State Management
* Autoplay
* Navigation Logic
* Context Distribution

---

## Viewport Layer

```tsx
<CarouselViewport />
```

Responsibilities:

* Clipping
* Hover Detection
* Autoplay Control

---

## Track Layer

```tsx
<CarouselTrack />
```

Responsibilities:

* Slide Movement
* Drag Handling
* Animation

---

## Slide Layer

```tsx
<CarouselSlide />
```

Responsibilities:

* Responsive Width Calculation
* Accessibility
* Layout

---

## Navigation Layer

```tsx
<CarouselPrevious />
<CarouselNext />
```

Responsibilities:

* Previous Navigation
* Next Navigation
* Disabled States

---

## Indicator Layer

```tsx
<CarouselIndicator />
```

Responsibilities:

* Dots
* Numbers
* Progress Indicators

---

# Props

```ts
interface CarouselProps {
  slides?: React.ReactNode[];

  perView?: number;
  scrollBy?: number;

  gap?: number;

  navStyle?:
    | "outside"
    | "inside"
    | "none";

  indicator?:
    | "dots"
    | "numbers"
    | "progress"
    | "none";

  autoplay?: boolean;

  interval?: number;

  speedFactor?: number;

  className?: string;
}
```