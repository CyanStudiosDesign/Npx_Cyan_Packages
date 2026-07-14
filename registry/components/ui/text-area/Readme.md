# Textarea

An auto-resizing textarea component that grows with the content up to a maximum height, then switches to a scrollable state. Built with `forwardRef` and accepts all standard textarea props.

## Import

```tsx
import { Textarea } from "@/components/ui/textarea/Textarea";
```

## Basic Usage

```tsx
<Textarea />
```

## With Placeholder and onChange

```tsx
<Textarea
  placeholder="Write something..."
  onChange={(e) => console.log(e.target.value)}
/>
```

## Disabled State

```tsx
<Textarea disabled placeholder="Not editable" />
```

## Controlled Usage

```tsx
const [value, setValue] = useState("");

<Textarea value={value} onChange={(e) => setValue(e.target.value)} />;
```

## With Ref

```tsx
const ref = useRef<HTMLTextAreaElement>(null);

<Textarea ref={ref} placeholder="Focused externally" />;
```

## Props

## Textarea

`Textarea` accepts all standard `textarea` HTML attributes.

| Prop          | Type                             | Default                       | Description                                                                           |
| ------------- | -------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| `placeholder` | `string`                         | `"Type your message here..."` | Placeholder text shown when the textarea is empty.                                    |
| `disabled`    | `boolean`                        | `false`                       | Disables the textarea. Applies reduced opacity and `not-allowed` cursor.              |
| `className`   | `string`                         | `undefined`                   | Adds custom classes to the textarea element.                                          |
| `onChange`    | `ChangeEventHandler`             | `undefined`                   | Fires on every keystroke. Height adjustment runs before calling the external handler. |
| `ref`         | `RefObject<HTMLTextAreaElement>` | `undefined`                   | Forwards a ref to the underlying textarea element.                                    |

## Auto-resize Behavior

The textarea starts at `rows={1}` and grows automatically as the user types. Once the content height reaches **200px**, the textarea stops growing and becomes scrollable instead.

```tsx
// Below 200px → height tracks content, overflow hidden
// At or above 200px → height locked at 200px, overflow-y auto
```

Height is recalculated on every `onChange` event and once on mount via `useEffect`.

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-canvas`
- `--color-border`
- `--color-fg`
- `--color-fg-muted`
- `--color-ring`
- `--shadow-inner`
- `--radius-xl`

The textarea is always `w-full min-h-11 max-h-50` with `resize-none`. Focus state uses `focus:ring-2 focus:ring-ring focus:border-ring/30`.

```tsx
// To change the max height, update both the JS threshold and the Tailwind class
const maxHeight = 240; // JS threshold
className = "max-h-60"; // Tailwind class
```

## Notes

- `Textarea` is a `"use client"` component and must run in the browser.
- The component uses an internal ref by default. If you pass an external `ref` via `forwardRef`, it takes precedence.
- `resize-none` is set on the textarea — manual resizing is disabled since height is managed programmatically.
- The scrollbar is hidden via `no-scrollbar` even when the textarea is in the scrollable state.
- The `cn()` utility from `@/lib/utils` is required.
