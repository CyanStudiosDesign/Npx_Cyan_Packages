# Marquee

A smooth, infinite scrolling band component. Supports left and right directions, scroll-reactive reversal, hover pause, angled rotation, and configurable speed and gap. Repeats content automatically to fill the container width.

## Import

```tsx
import Marquee from "@/components/ui/marquee/Marquee";
```

## Basic Usage

Wrap any content inside `Marquee`. It scrolls left by default.

```tsx
<Marquee speed={1.5} gap={48} className="bg-zinc-200 py-6">
  <h2 className="text-5xl font-bold uppercase">Web Developer</h2>
  <img src="/star.svg" alt="" className="w-6" />
  <h2 className="text-5xl font-bold uppercase">UI Designer</h2>
  <img src="/star.svg" alt="" className="w-6" />
</Marquee>
```

## Scroll-reactive with Angle

Reverses direction based on the page's scroll direction. Accepts a rotation angle for a slanted band effect.

```tsx
<Marquee
  reverseOnScroll
  angle={-4}
  speed={2}
  pauseOnHover
  gap={64}
  className="bg-blue-600 text-white py-6"
>
  <span className="text-4xl font-medium">Available for work</span>
</Marquee>
```

## Logo Strip Scrolling Right

```tsx
<Marquee direction="right" speed={0.8} gap={80}>
  <img src="/logo1.svg" alt="" className="h-10" />
  <img src="/logo2.svg" alt="" className="h-10" />
</Marquee>
```

## Props

## Marquee

| Prop                   | Type                | Default     | Description                                                                                               |
| ---------------------- | ------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `children`             | `ReactNode`         | Required    | Content to scroll. Repeated automatically to fill the track width.                                        |
| `direction`            | `"left" \| "right"` | `"left"`    | Base scroll direction.                                                                                    |
| `speed`                | `number`            | `1`         | Pixels moved per animation frame. Higher values scroll faster.                                            |
| `reverseOnScroll`      | `boolean`           | `false`     | Flips the scroll direction based on the page's scroll direction.                                          |
| `pauseOnHover`         | `boolean`           | `false`     | Pauses the animation while the marquee is hovered.                                                        |
| `angle`                | `number`            | `0`         | Rotates the entire band in degrees (e.g. `-4` for a slanted marquee).                                     |
| `gap`                  | `number`            | `0`         | Space between repeated copies of the content, in pixels.                                                  |
| `minCopies`            | `number`            | `2`         | Minimum number of content copies to render. More are added automatically if needed to fill the container. |
| `respectReducedMotion` | `boolean`           | `true`      | Renders the marquee as static when the user's OS "reduce motion" setting is on.                           |
| `className`            | `string`            | `undefined` | Adds custom classes to the outer wrapper.                                                                 |
| `style`                | `CSSProperties`     | `undefined` | Adds inline styles to the outer wrapper.                                                                  |

## Direction

Use `direction` to control which way the content scrolls.

```tsx
// Scrolls left (default)
<Marquee direction="left" gap={48}>...</Marquee>

// Scrolls right
<Marquee direction="right" gap={48}>...</Marquee>
```

## Styling

`Marquee` has no built-in visual styles. Use `className` and `style` to control the appearance of the outer wrapper. Style the content inside directly via your own classes.

```tsx
<Marquee speed={1.5} gap={48} className="bg-zinc-950 py-8 overflow-hidden">
  <span className="text-white text-4xl font-bold uppercase">Hello World</span>
</Marquee>
```

## Notes

- Content is automatically duplicated enough times to fill the container width — you only need to provide one set of items.
- The animation runs via `requestAnimationFrame` and mutates the DOM directly, so it never causes React re-renders.
- `respectReducedMotion` is `true` by default. The marquee renders as a static row when the user has enabled "reduce motion" in their OS settings.
- When `angle` is set, the inner container is widened slightly (`108%`) to prevent rotated corners from revealing gaps at the edges.
- `minCopies` is a floor — the component always renders at least this many copies, but may render more depending on container width.
- The component is a `"use client"` component and must run in the browser.
- `gap` is applied between copies of the content block, not between individual items inside a copy. Use margin or padding on your child elements for inner spacing.
