# ScrollArea

A reusable scroll container component for displaying long lists or overflowing content inside a styled scrollable area. It automatically handles vertical scrolling and uses the design tokens from `globals.css` for light and dark theme support.

## Import

```tsx
import ScrollArea from "@/components/ui/scrollArea/ScrollArea";
```

## Basic Usage

```tsx
const tags = [
  "v1.2.0-beta.50",
  "v1.2.0-beta.49",
  "v1.2.0-beta.48",
  "v1.2.0-beta.47",
];

<ScrollArea
  title="Tags"
  items={tags}
/>
```

## Example

```tsx
const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Watermelon",
  "Strawberry",
  "Kiwi",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center">
      <ScrollArea
        title="Fruits"
        items={fruits}
        height="320px"
      />
    </div>
  );
}
```

## Props

| Prop     | Type       | Default     | Description                                                                                     |
| -------- | ---------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `title`  | `string`   | `undefined` | Optional heading displayed at the top of the scroll area.                                       |
| `items`  | `string[]` | Required    | Array of items rendered inside the scroll area.                                                 |
| `height` | `string`   | `"300px"`   | Controls the height of the scroll container. Overflow content becomes scrollable automatically. |

## Component API

```tsx
type ScrollAreaProps = {
  title?: string;
  items: string[];
  height?: string;
};
```

## Styling

The component uses semantic design tokens from `globals.css`.

### Tokens Used

* `bg-surface`
* `border-border`
* `text-fg`
* `text-fg-muted`

This allows the component to automatically adapt to both light and dark themes.

## Custom Height

You can control the scroll area height using the `height` prop.

```tsx
<ScrollArea
  title="Versions"
  items={versions}
  height="400px"
/>
```

## Light and Dark Theme Support

The component automatically responds to:

```html
data-theme="dark"
```

No additional configuration is needed.

## Notes

* The component automatically enables vertical scrolling when content exceeds the container height.
* Each item is rendered with a bottom border separator.
* The component is designed for simple string-based lists.
* Uses flexbox and overflow utilities only.
* No external dependencies are required.

## Example Use Cases

### Tags

```tsx
<ScrollArea
  title="Tags"
  items={tags}
/>
```

### Fruits

```tsx
<ScrollArea
  title="Fruits"
  items={fruits}
/>
```

### Versions

```tsx
<ScrollArea
  title="Versions"
  items={versions}
/>
```

### Usernames

```tsx
<ScrollArea
  title="Users"
  items={users}
/>
```
