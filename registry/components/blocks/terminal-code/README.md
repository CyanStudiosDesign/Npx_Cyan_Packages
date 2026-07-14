# Terminal Code

Canonical export path for the reusable terminal command block.

```tsx
import { TerminalCode } from "@/components/blocks/terminal-code";
```

The implementation lives in `components/blocks/terminalCode`.
`GetStartedBlock` is still exported as a backwards-compatible alias.

The block renders only the command card by default. Wrap it with page-level
headings or helper text where needed, or opt into the internal copy with
`showHeader`.

```tsx
<TerminalCode
  showHeader
  title="Get started in seconds"
  description="Copy a command or switch package managers."
/>
```

Use `inverted` when placing the card on an inverse/dark token surface.
