# Resizable

A simple two-panel resizable layout component. It supports horizontal and vertical resizing, custom panel content, and nested layouts.

## Import

```tsx
import Resizable from "@/components/ui/resizable/Resizable";
```

## Basic Usage

```tsx
<Resizable
  className="h-screen"
  leftPanel={<div className="h-full p-4">Left panel</div>}
  rightPanel={<div className="h-full p-4">Right panel</div>}
/>
```

## Vertical Usage

```tsx
<Resizable
  className="h-screen"
  direction="vertical"
  leftPanel={<div className="h-full p-4">Top panel</div>}
  rightPanel={<div className="h-full p-4">Bottom panel</div>}
/>
```

## Nested Usage

Use nesting when you need more than two panels.

```tsx
<Resizable
  className="h-screen"
  leftPanel={<div className="h-full p-4">Sidebar</div>}
  rightPanel={
    <Resizable
      direction="vertical"
      leftPanel={<div className="h-full p-4">Editor</div>}
      rightPanel={<div className="h-full p-4">Preview</div>}
    />
  }
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leftPanel` | `React.ReactNode` | Required | First panel content. In vertical mode, this becomes the top panel. |
| `rightPanel` | `React.ReactNode` | Required | Second panel content. In vertical mode, this becomes the bottom panel. |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Resize direction. |
| `defaultLeftWidth` | `number` | `50` | Initial size of the first panel in percent. |
| `minLeftWidth` | `number` | `2` | Minimum size of the first panel in percent. |
| `maxLeftWidth` | `number` | `98` | Maximum size of the first panel in percent. |
| `className` | `string` | `undefined` | Classes for the outer wrapper. |
| `leftClassName` | `string` | `undefined` | Classes for the first panel wrapper. |
| `rightClassName` | `string` | `undefined` | Classes for the second panel wrapper. |
| `dividerClassName` | `string` | `undefined` | Classes for the resize divider. |

## Notes

- The component uses `h-full` and `w-full` by default.
- Make sure the parent or `className` gives it a real height, such as `h-screen` or `h-96`.
- For more than two panels, nest another `Resizable` inside `leftPanel` or `rightPanel`.