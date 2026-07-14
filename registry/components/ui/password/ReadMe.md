# Password

A password input component with real-time strength feedback. Shows a five-segment strength bar, a strength level label, and a checklist of validation rules that update as the user types. Includes a show/hide password toggle.

## Import

```tsx
import Password from "@/components/ui/password/Password";
```

## Basic Usage

`Password` is self-contained and works out of the box with no required props.

```tsx
<Password />
```

## Custom Minimum Length

Pass `passwordLength` to change the minimum character requirement enforced by the input's `minLength` attribute.

```tsx
<Password passwordLength={8} />
```

## Props

## Password

| Prop             | Type     | Default | Description                                                          |
| ---------------- | -------- | ------- | -------------------------------------------------------------------- |
| `passwordLength` | `number` | `6`     | Minimum password length passed to the input's `minLength` attribute. |

## Strength Levels

The strength score is calculated by counting how many of the 5 validation rules pass. Bars fill left to right — the first `score` bars are colored, the rest stay muted.

| Score | Level       | Bar Color            |
| ----- | ----------- | -------------------- |
| `0`   | Empty       | Muted (all unfilled) |
| `1`   | Weak        | Danger (red)         |
| `2`   | Fair        | Warning (orange)     |
| `3`   | Good        | Yellow               |
| `4`   | Strong      | Success (green)      |
| `5`   | Very Strong | Success (green)      |

## Validation Rules

The checklist evaluates these five rules in order:

```tsx
{ label: "Minimum number of characters is 6.", test: (v) => v.length >= 6 }
{ label: "Should contain lowercase.",          test: (v) => /[a-z]/.test(v) }
{ label: "Should contain uppercase.",          test: (v) => /[A-Z]/.test(v) }
{ label: "Should contain numbers.",            test: (v) => /[0-9]/.test(v) }
{ label: "Should contain special characters.", test: (v) => /[^a-zA-Z0-9]/.test(v) }
```

Each rule shows a green `Check` icon when it passes, and a muted `X` icon when it does not.

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-canvas`
- `--color-fg`
- `--color-fg-muted`
- `--color-fg-subtle`
- `--color-border`
- `--color-border-strong`
- `--color-subtle`
- `--color-danger`
- `--color-warning`
- `--color-success`

The input container is always `w-100`. To make it fluid, replace that with `w-full` and wrap it in a sized container.

```tsx
// Fixed width (default)
<div className="w-100 ...">

// Full width
<div className="w-full max-w-md ...">
```

## Notes

- `Password` is a `"use client"` component and must run in the browser.
- Input state is managed internally. There is no `value` or `onChange` prop — extend the component if you need to read the password value from outside.
- `passwordLength` only sets the HTML `minLength` attribute on the input. It does not update the first validation rule, which is hardcoded to check for 6 characters.
- The show/hide toggle uses `Eye` and `EyeOff` icons from `lucide-react`.
- `Check` and `X` icons in the checklist are also from `lucide-react`.
- Strength bar colors transition over `300ms` as rules pass or fail.
