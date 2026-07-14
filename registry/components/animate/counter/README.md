# Counter

Odometer-style animated counter for numeric stats and metric highlights.

```tsx
import { Counter } from "@/components/animate/counter";

export default function Example() {
  return (
    <Counter
      value={128.4}
      trigger="in-view"
      viewport={{ once: true, amount: 0.5 }}
      places={[100, 10, 1, ".", 0.1]}
      allowNegative
      transition={{ duration: 0.55 }}
      className="text-5xl font-semibold text-fg"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | Required | The numeric value to display in the counter. |
| `places` | `(number \| ".")[]` | `auto` | Defines which digit positions to display. Include whole number and decimal place values. Use `"."` for the decimal point. |
| `duration` | `number` | `0.45` | Digit reel transition duration, in seconds. |
| `trigger` | `"immediate" \| "in-view" \| "manual"` | `"immediate"` | Controls when the counter starts. |
| `startWhen` | `boolean` | `undefined` | Manual trigger flag. Use with `trigger="manual"`. |
| `transition` | `{ duration?: number }` | Duration prop | Framer-like timing controls. |
| `viewport` | `{ once?: boolean; amount?: number \| "some" \| "all"; margin?: string }` | `{ once: true }` | In-view observer options. |
| `separator` | `string` | `","` | Thousands separator. |
| `decimals` | `number` | `auto` | Decimal places to display. |
| `allowNegative` | `boolean` | `false` | Allows negative values to render with a minus sign. |
| `prefix` | `string` | `""` | Text shown before the number. |
| `suffix` | `string` | `""` | Text shown after the number. |
| `className` | `string` | `undefined` | Classes applied to the root wrapper. |
