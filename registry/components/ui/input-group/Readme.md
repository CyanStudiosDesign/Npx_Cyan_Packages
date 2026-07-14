# Input Components

Two styled input components for common form patterns: a search input with a leading icon and a password input with a trailing icon.

## Components

| Component       | File              | Description                                 |
| --------------- | ----------------- | ------------------------------------------- |
| `<Inputgroup>`  | `inputgroup.tsx`  | Text input with a leading search icon       |
| `<Inputinline>` | `inputinline.tsx` | Password input with a trailing eye-off icon |

## Usage

```tsx
import { Inputgroup } from "./inputgroup";
import { Inputinline } from "./inputinline";

export default function Example() {
  return (
    <div>
      <Inputgroup placeholder="Search items..." />
      <Inputinline placeholder="Enter your password" />
    </div>
  );
}
```

## API

### `<Inputgroup>`

A search input with a `Search` icon pinned to the left.

| Prop          | Type     | Default       | Description                                          |
| ------------- | -------- | ------------- | ---------------------------------------------------- |
| `placeholder` | `string` | `"Search..."` | Input placeholder text                               |
| `className`   | `string` | —             | Additional classes merged onto the `<input>` element |

### `<Inputinline>`

A password input (`type="password"`) with an `EyeOff` icon pinned to the right.

| Prop          | Type     | Default            | Description                                          |
| ------------- | -------- | ------------------ | ---------------------------------------------------- |
| `placeholder` | `string` | `"Enter password"` | Input placeholder text                               |
| `className`   | `string` | —                  | Additional classes merged onto the `<input>` element |

> **Note:** The `EyeOff` icon is decorative only (`pointer-events-none`). Toggle visibility behaviour is not included — wire up your own `useState` if needed.

## Default Styles

Both components share a consistent base style on the `<input>`:

| Class                          | Effect                                  |
| ------------------------------ | --------------------------------------- |
| `w-full`                       | Full width of the container             |
| `h-8`                          | Fixed height                            |
| `bg-surface`                   | Surface background color (design token) |
| `border border-border`         | Border using design token color         |
| `rounded-md`                   | Medium border radius                    |
| `text-fg`                      | Foreground text color (design token)    |
| `placeholder:text-fg-subtle`   | Subtle color for placeholder text       |
| `focus:ring-2 focus:ring-ring` | Focus ring using design token           |
| `transition-all`               | Smooth transitions on state changes     |

The container is `w-full` on mobile and fixed at `md:w-[350px]` on medium screens and above.

## Requirements

- React 18+
- Tailwind CSS
- `cn` utility from `@/lib/utils` (e.g. `clsx` + `tailwind-merge`)
- [lucide-react](https://lucide.dev) for icons
- Design tokens `surface`, `border`, `fg`, `fg-subtle`, and `ring` defined in your Tailwind theme
