# CountUp

Accessible count animation for stats, counters, and numeric highlights.

```tsx
import { CountUp } from "@/components/text/CountUp";

export default function Example() {
  return (
    <CountUp
      start={0}
      end={12840}
      trigger="in-view"
      transition={{ delay: 0.15, duration: 2 }}
      viewport={{ once: true, amount: 0.5 }}
      separator=","
      className="text-5xl font-semibold text-fg"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `start` | `number` | Required | The number shown before the animation starts. |
| `end` | `number` | Required | The number the animation counts toward. |
| `delay` | `number` | `0` | Delay before counting begins, in seconds. |
| `duration` | `number` | `1` | How long the count animation runs, in seconds. |
| `trigger` | `"immediate" \| "in-view" \| "manual"` | `"immediate"` | Controls when the count starts. |
| `startWhen` | `boolean` | `undefined` | Manual trigger flag. Use with `trigger="manual"`. |
| `transition` | `{ delay?: number; duration?: number }` | Delay / duration props | Framer-like timing controls. |
| `viewport` | `{ once?: boolean; amount?: number \| "some" \| "all"; margin?: string }` | `{ once: true }` | In-view observer options. |
| `separator` | `string` | `","` | Thousands separator used while formatting the number. |
| `seperator` | `string` | `undefined` | Compatibility alias for `separator`. |
| `className` | `string` | `undefined` | Classes applied to the root text wrapper. |
