# FieldLabel

A simple, accessible form label component that wraps the native `<label>` element with consistent typography and spacing.

## Usage

```tsx
import { FieldLabel } from "./FieldLabel";

export default function Example() {
  return (
    <div>
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <input id="email" type="email" />
    </div>
  );
}
```

## API

### `<FieldLabel>`

| Prop        | Type              | Required | Description                            |
| ----------- | ----------------- | -------- | -------------------------------------- |
| `children`  | `React.ReactNode` | Yes      | Label text or content                  |
| `htmlFor`   | `string`          | Yes      | ID of the associated form element      |
| `className` | `string`          | No       | Additional classes to merge via `cn()` |

## Default Styles

The component applies the following Tailwind classes by default:

| Class         | Effect                                   |
| ------------- | ---------------------------------------- |
| `block`       | Renders as a block element               |
| `text-sm`     | Small font size                          |
| `font-medium` | Medium font weight                       |
| `text-fg`     | Foreground text color (design token)     |
| `mb-1.5`      | Bottom margin to space it from its input |
| `select-none` | Prevents accidental text selection       |

Additional classes passed via `className` are merged using [`cn()`](https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/utils.ts) and will override defaults where there is a conflict.

## Requirements

- React 18+
- Tailwind CSS
- `cn` utility from `@/lib/utils` (e.g. `clsx` + `tailwind-merge`)
- `text-fg` color defined in your Tailwind theme
