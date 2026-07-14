# Collapsible

A compound collapsible component with controlled and uncontrolled support. All three parts are built with `forwardRef` and share open/close state via React context.

## Import

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible/Collapsible";
```

## Basic Usage

Uncontrolled — manages its own open/close state internally.

```tsx
<Collapsible>
  <div className="flex items-center justify-between">
    <span>Section title</span>
    <CollapsibleTrigger />
  </div>
  <CollapsibleContent>
    <p>This content shows when expanded.</p>
  </CollapsibleContent>
</Collapsible>
```

## Default Open

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger />
  <CollapsibleContent>
    <p>Visible by default.</p>
  </CollapsibleContent>
</Collapsible>
```

## Controlled Usage

Pass `open` and `onOpenChange` to control the state from outside.

```tsx
const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger />
  <CollapsibleContent>
    <p>Controlled content.</p>
  </CollapsibleContent>
</Collapsible>;
```

## Always Visible Content

Use `alwaysVisible` on `CollapsibleContent` to render content regardless of open state.

```tsx
<Collapsible>
  <div className="flex items-center justify-between">
    <span>Section title</span>
    <CollapsibleTrigger />
  </div>

  <CollapsibleContent alwaysVisible>
    <p>This is always shown.</p>
  </CollapsibleContent>

  <CollapsibleContent>
    <p>This only shows when expanded.</p>
  </CollapsibleContent>
</Collapsible>
```

## Custom Trigger Content

`CollapsibleTrigger` renders a `ChevronsUpDown` icon by default. Pass children to replace it.

```tsx
<CollapsibleTrigger>
  <span className="text-sm">Toggle</span>
</CollapsibleTrigger>
```

## Props

## Collapsible

| Prop           | Type                        | Default     | Description                                      |
| -------------- | --------------------------- | ----------- | ------------------------------------------------ |
| `children`     | `ReactNode`                 | Required    | Sub-components to render inside the collapsible. |
| `open`         | `boolean`                   | `undefined` | Controlled open state. Use with `onOpenChange`.  |
| `defaultOpen`  | `boolean`                   | `false`     | Initial open state for uncontrolled usage.       |
| `onOpenChange` | `(open: boolean) => void`   | `undefined` | Callback fired when the open state changes.      |
| `className`    | `string`                    | `undefined` | Adds custom classes to the root wrapper div.     |
| `ref`          | `RefObject<HTMLDivElement>` | `undefined` | Forwards a ref to the root div element.          |

`Collapsible` also accepts all standard `div` props.

## CollapsibleTrigger

| Prop        | Type                           | Default     | Description                                                                                     |
| ----------- | ------------------------------ | ----------- | ----------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`                    | `undefined` | Custom content for the trigger button. Falls back to the `ChevronsUpDown` icon if not provided. |
| `className` | `string`                       | `undefined` | Adds custom classes to the trigger button.                                                      |
| `ref`       | `RefObject<HTMLButtonElement>` | `undefined` | Forwards a ref to the button element.                                                           |

`CollapsibleTrigger` also accepts all standard `button` props.

## CollapsibleContent

| Prop            | Type                        | Default     | Description                                     |
| --------------- | --------------------------- | ----------- | ----------------------------------------------- |
| `children`      | `ReactNode`                 | Required    | Content to show or hide.                        |
| `alwaysVisible` | `boolean`                   | `false`     | Renders the content regardless of open state.   |
| `className`     | `string`                    | `undefined` | Adds custom classes to the content wrapper div. |
| `ref`           | `RefObject<HTMLDivElement>` | `undefined` | Forwards a ref to the content div element.      |

`CollapsibleContent` also accepts all standard `div` props.

## useCollapsible Hook

Use `useCollapsible` to read or set open state from any custom component inside the tree.

```tsx
import { useCollapsible } from "@/components/ui/collapsible/Collapsible";

function CustomToggle() {
  const { isOpen, setIsOpen } = useCollapsible();
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "Close" : "Open"}
    </button>
  );
}
```

`useCollapsible` throws if called outside a `<Collapsible>` provider.

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-canvas`
- `--color-surface`
- `--color-border`
- `--color-fg-muted`
- `focus-ring-visible`

The root wrapper is always `w-full`. The trigger is `w-10 h-10 rounded-lg`. The `ChevronsUpDown` icon rotates 180° when open via `transition-transform duration-200`.

```tsx
// To change trigger size
<CollapsibleTrigger className="w-8 h-8" />

// To animate content open/close, add transition classes
<CollapsibleContent className="animate-in slide-in-from-top-1 duration-150">
```

## Notes

- `Collapsible` is a `"use client"` component and must run in the browser.
- All three sub-components must be rendered inside a `<Collapsible>` — they consume context via `useCollapsible()` and will throw if used outside.
- The root `div` has a `data-state` attribute (`"open"` or `"closed"`) that can be used for CSS targeting.
- `CollapsibleContent` unmounts from the DOM when closed (unless `alwaysVisible` is set). There is no CSS-only hide/show — content is conditionally rendered.
- In controlled mode (`open` prop provided), internal state is bypassed. `onOpenChange` still fires on every toggle.
- `lucide-react` is required for the default `ChevronsUpDown` icon in `CollapsibleTrigger`.
- The `cn()` utility from `@/lib/utils` is required.
