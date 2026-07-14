# Motion

Small dependency-free motion primitives for Cyan UI animated components.

## In View

```tsx
import { useInView } from "@/motion";

function Section() {
  const { ref, isInView } = useInView({
    once: true,
    amount: 0.25,
    margin: "0px 0px -10% 0px",
  });

  return <section ref={ref}>{isInView ? "Visible" : "Waiting"}</section>;
}
```

## Component Triggers

Animated components can use the same Framer-like shape:

```tsx
<TextSplit
  text="Animate when visible"
  trigger="in-view"
  whileInView={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 18 }}
  transition={{ duration: 0.6, staggerChildren: 0.035 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

Available trigger modes:

```tsx
<TextSplit text="Immediate" trigger="immediate" />
<TextSplit text="In view" trigger="in-view" viewport={{ once: true }} />
<TextSplit text="Manual" trigger="manual" startWhen={active} />
```

`whileInView` automatically makes the trigger `in-view` when no explicit
`trigger` is provided.
