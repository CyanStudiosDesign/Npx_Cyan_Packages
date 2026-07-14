# RotatingText

Animated rotating text for short phrases, headlines, and compact status copy.

```tsx
import { RotatingText } from "@/components/text/RotatingText";

export default function Example() {
  return (
    <RotatingText
      text={["fast", "polished", "reusable"]}
      trigger="in-view"
      stayDuration={1.6}
      transition={{ duration: 0.42, staggerChildren: 0.035 }}
      viewport={{ once: true, amount: 0.45 }}
      className="text-primary"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string[]` | Required | Phrases to rotate through. |
| `stayDuration` | `number` | `1.6` | Time each phrase stays visible, in seconds. |
| `stayDuratiion` | `number` | `undefined` | Compatibility alias for `stayDuration`. |
| `rotationDuration` | `number` | `0.42` | Enter and exit animation duration for each letter, in seconds. |
| `staggerDelay` | `number` | `0.035` | Delay between each letter animation, in seconds. |
| `trigger` | `"immediate" \| "in-view" \| "manual"` | `"immediate"` | Controls when phrase rotation starts. |
| `startWhen` | `boolean` | `undefined` | Manual trigger flag. Use with `trigger="manual"`. |
| `transition` | `{ duration?: number; staggerChildren?: number }` | Rotation props | Framer-like timing controls. |
| `viewport` | `{ once?: boolean; amount?: number \| "some" \| "all"; margin?: string }` | `{ once: true }` | In-view observer options. |
| `loop` | `boolean` | `true` | Restarts from the first phrase after the last phrase. |
| `className` | `string` | `undefined` | Classes applied to the root text wrapper. |
