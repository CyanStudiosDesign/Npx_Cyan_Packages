# InputNumber

A numeric input component with increment/decrement controls. Supports four layout variants — horizontal, vertical, compact, and labeled — all sharing the same props API. Enforces `min`/`max` bounds and a configurable `step` value.

---

## File Structure

```
components/ui/input-number/
├── InputNumber.tsx          # Main component — handles logic, delegates to variants
├── InputNumberVariants.tsx  # Four layout variants (Horizontal, Vertical, Compact, Labeled)
└── InputNumberControls.tsx  # Shared primitives: InputNumberButton, InputNumberField
```

---

## Import

```tsx
import { InputNumber } from "@/components/ui/input-number/InputNumber";
```

---

## Basic Usage

```tsx
const [qty, setQty] = useState(1);

<InputNumber value={qty} onChange={setQty} />
```

---

## Variants

### Horizontal *(default)*
`− [  value  ] +` — controls on either side of the field.

```tsx
<InputNumber value={qty} onChange={setQty} type="horizontal" />
```

### Vertical
`[ value ] [+]` — stacked `+` / `−` buttons to the right of the field.
       `[-]`

```tsx
<InputNumber value={qty} onChange={setQty} type="vertical" />
```

### Compact
Smaller buttons (`h-6 w-6`) and a narrower field (`w-14`). Good for dense UIs or tables.

```tsx
<InputNumber value={qty} onChange={setQty} type="compact" />
```

### Labeled
Adds a `"Quantity"` label above a horizontal layout.

```tsx
<InputNumber value={qty} onChange={setQty} type="labeled" />
```

---

## Props

### `<InputNumber>`

| Prop        | Type                                             | Default        | Description                                              |
|-------------|--------------------------------------------------|----------------|----------------------------------------------------------|
| `value`     | `number`                                         | —              | Current value. Required — this is a controlled component.|
| `onChange`  | `(value: number) => void`                        | —              | Callback fired on increment, decrement, or direct input. |
| `min`       | `number`                                         | `0`            | Minimum allowed value. Decrement button disables at min. |
| `max`       | `number`                                         | `10000`        | Maximum allowed value. Increment button disables at max. |
| `step`      | `number`                                         | `1`            | Amount to increment or decrement per click.              |
| `type`      | `"horizontal" \| "vertical" \| "compact" \| "labeled"` | `"horizontal"` | Layout variant.                                  |
| `className` | `string`                                         | —              | Extra classes merged onto the variant's wrapper element. |

---

## Bounds Behaviour

- `increment` clamps to `Math.min(value + step, max)` — the `+` button is disabled when `value >= max`.
- `decrement` clamps to `Math.max(value - step, min)` — the `−` button is disabled when `value <= min`.
- Direct keyboard input via `InputNumberField` is not clamped internally — the native `min`/`max` attributes are passed to the `<input>` but enforcement depends on the browser. Validate on `onChange` if strict clamping is needed for typed input.

---

## Internal Components

These are not exported for public use but are documented here for contributors.

### `InputNumberButton`

| Prop       | Type                    | Default | Description                             |
|------------|-------------------------|---------|-----------------------------------------|
| `onClick`  | `() => void`            | —       | Click handler.                          |
| `disabled` | `boolean`               | —       | Disables the button and reduces opacity.|
| `compact`  | `boolean`               | `false` | `h-6 w-6` when true, `h-8 w-8` otherwise.|
| `children` | `React.ReactNode`       | —       | Button label (typically `+` or `−`).    |

### `InputNumberField`

| Prop       | Type                         | Default | Description                                      |
|------------|------------------------------|---------|--------------------------------------------------|
| `value`    | `number`                     | —       | Controlled value passed to `<input>`.            |
| `onChange` | `(value: number) => void`    | —       | Fires with `Number(e.target.value)` on change.   |
| `min`      | `number`                     | —       | Native `min` attribute on the input.             |
| `max`      | `number`                     | —       | Native `max` attribute on the input.             |
| `compact`  | `boolean`                    | `false` | `w-14 text-sm` when true, `w-20` otherwise.      |

---

## Styling Notes

- All variants use `bg-surface`, `border-border`, and `text-fg` design tokens — fully theme-aware.
- The field uses `bg-canvas` to visually differentiate it from the surrounding container.
- Disabled buttons use `opacity-50` via Tailwind; no extra disabled styles needed.
- `focus-ring-visible` is applied to both the button and input for keyboard accessibility.
- `className` is forwarded to each variant's outermost wrapper, so layout overrides (e.g. `w-full`) work as expected.
