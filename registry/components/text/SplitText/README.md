# TextSplit

Accessible split-text animation for short headings, labels, and hero copy.

```tsx
import { TextSplit } from "@/components/text/SplitText";

export default function Example() {
  return (
    <TextSplit
      text="Animate text with a smooth stagger"
      splitType="chars"
      trigger="in-view"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.055 }}
      viewport={{ once: true, amount: 0.35 }}
      className="text-2xl font-semibold text-fg"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | Required | Text to split and animate. |
| `splitType` | `"chars" \| "words" \| "lines"` | `"chars"` | Split by characters, whole words, or newline-delimited lines. |
| `mode` | `"chars" \| "words" \| "lines"` | `undefined` | Compatibility alias for `splitType`. |
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"up"` | Entrance direction. |
| `from` | `{ opacity?: number; x?: number \| string; y?: number \| string; scale?: number; filter?: string }` | Direction preset | Custom starting visual state. |
| `to` | `{ opacity?: number; x?: number \| string; y?: number \| string; scale?: number; filter?: string }` | Visible state | Custom ending visual state. |
| `trigger` | `"immediate" \| "in-view" \| "manual"` | `"immediate"` | Controls when the animation starts. |
| `startWhen` | `boolean` | `undefined` | Manual trigger flag. Use with `trigger="manual"`. |
| `initial / animate / whileInView` | `MotionState` | `undefined` | Framer-like motion states. |
| `transition` | `{ duration?: number; delay?: number; staggerChildren?: number }` | Duration props | Framer-like timing controls. |
| `viewport` | `{ once?: boolean; amount?: number \| "some" \| "all"; margin?: string }` | `{ once: true }` | In-view observer options. |
| `delay` | `number` | `0` | Initial delay in seconds. |
| `duration` | `number` | `0.7` | Duration of each animated part, in seconds. |
| `staggerDelay` | `number` | `auto` | Delay between each animated character, word, or line, in seconds. |
| `className` | `string` | `undefined` | Classes applied to the root text wrapper. |

The visual split spans are hidden from assistive technology and the full text is exposed once for screen readers.
