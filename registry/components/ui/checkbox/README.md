# Checkbox

A single checkbox component built with `forwardRef`. Supports controlled and uncontrolled usage, a disabled state, and an animated check icon. Implemented as a `<button>` element with `role="checkbox"` for accessibility.

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
```

## Basic Usage

Uncontrolled — manages its own checked state internally.

```tsx
<Checkbox />
```

## With onChange

```tsx
<Checkbox onChange={(checked) => console.log(checked)} />
```

## Default Checked

```tsx
<Checkbox defaultChecked />
```

## Controlled Usage

Pass `checked` and `onChange` to control the state from outside.

```tsx
const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onChange={(val) => setChecked(val)} />;
```

## Disabled State

```tsx
<Checkbox disabled />
<Checkbox disabled defaultChecked />
```

## With a Label

`Checkbox` is a button element — pair it with a `<label>` for accessible labeling.

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" onChange={(val) => console.log(val)} />
  <label htmlFor="terms" className="text-sm text-fg cursor-pointer">
    Accept terms and conditions
  </label>
</div>
```

## Props

## Checkbox

| Prop             | Type                           | Default        | Description                                                             |
| ---------------- | ------------------------------ | -------------- | ----------------------------------------------------------------------- |
| `checked`        | `boolean`                      | `undefined`    | Controlled checked state. Use with `onChange` for controlled usage.     |
| `defaultChecked` | `boolean`                      | `false`        | Initial checked state for uncontrolled usage.                           |
| `onChange`       | `(checked: boolean) => void`   | `undefined`    | Callback fired with the new checked value on every toggle.              |
| `disabled`       | `boolean`                      | `false`        | Disables interaction. Applies reduced opacity and `not-allowed` cursor. |
| `id`             | `string`                       | Auto-generated | ID for the button element. Auto-generated via `useId` if not provided.  |
| `className`      | `string`                       | `undefined`    | Adds custom classes to the checkbox button.                             |
| `ref`            | `RefObject<HTMLButtonElement>` | `undefined`    | Forwards a ref to the underlying button element.                        |

`Checkbox` also accepts all standard `button` props except `onChange`.

## Checked vs Unchecked

The checkbox manages its own visual state. The `Check` icon animates in and out on toggle.

```tsx
// Unchecked — canvas background, default border, icon hidden
bg-canvas border-border → icon: opacity-0 scale-50 -rotate-12

// Checked — inverse background, inverse border, icon visible
bg-inverse border-inverse → icon: opacity-100 scale-100 rotate-0
```

Both transitions use `duration-200 ease-out`.

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-canvas`
- `--color-inverse`
- `--color-border`
- `--color-disabled`

The checkbox is always `h-5 w-5` and `rounded-md`. The `Check` icon is `h-3.5 w-3.5` with `stroke-[3.5]`.

```tsx
// To change size, override h/w on both the button and the icon
<Checkbox className="h-6 w-6" />
```

## Notes

- `Checkbox` is a `"use client"` component and must run in the browser.
- The component is implemented as a `<button>` with `role="checkbox"` and `aria-checked` for screen reader support.
- The `id` prop is auto-generated via `useId` if not provided — useful when pairing with a `<label>`.
- In controlled mode (`checked` prop provided), internal state is bypassed. `onChange` still fires on every click.
- `lucide-react` is required for the `Check` icon.
- The `cn()` utility from `@/lib/utils` is required.
