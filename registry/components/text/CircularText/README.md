# CircularText

Circular text animation for badges, visual accents, and interactive markers.

```tsx
import { CircularText } from "@/components/text/CircularText";

export default function Example() {
  return (
    <CircularText
      text="React Bits * Components * "
      trigger="in-view"
      transition={{ duration: 12 }}
      viewport={{ once: true, amount: 0.6 }}
      radius={60}
      className="text-fg"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | Required | Text rendered around the circular path. |
| `duration` | `number` | `10` | Time for one full rotation, in seconds. |
| `radius` | `number` | `72` | Radius of the circular path in pixels. Use a smaller value in compact previews. |
| `trigger` | `"immediate" \| "in-view" \| "manual"` | `"immediate"` | Controls when rotation starts. |
| `startWhen` | `boolean` | `undefined` | Manual trigger flag. Use with `trigger="manual"`. |
| `transition` | `{ duration?: number }` | Duration prop | Framer-like timing controls. |
| `viewport` | `{ once?: boolean; amount?: number \| "some" \| "all"; margin?: string }` | `{ once: true }` | In-view observer options. |
| `className` | `string` | `undefined` | Classes applied to the root wrapper. |
