# AspectRatio

A lightweight wrapper component that constrains its children to a fixed aspect ratio. Useful for images, videos, maps, embeds, or any media that should maintain consistent proportions across different screen sizes.

---

## Import

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";
```

---

## Basic Usage

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="/photo.jpg" alt="Landscape" className="h-full w-full object-cover" />
</AspectRatio>
```

---

## Examples

**Square**
```tsx
<AspectRatio ratio={1}>
  <img src="/avatar.jpg" alt="Avatar" className="h-full w-full object-cover" />
</AspectRatio>
```

**4:3 (classic photo)**
```tsx
<AspectRatio ratio={4 / 3}>
  <img src="/photo.jpg" alt="Photo" className="h-full w-full object-cover" />
</AspectRatio>
```

**Video embed**
```tsx
<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    className="h-full w-full"
    allowFullScreen
  />
</AspectRatio>
```

---

## Props

| Prop        | Type                | Default    | Description                                                                 |
|-------------|---------------------|------------|-----------------------------------------------------------------------------|
| `ratio`     | `number`            | `16 / 9`   | Aspect ratio expressed as `width / height` (e.g. `16/9`, `4/3`, `1`).      |
| `children`  | `React.ReactNode`   | —          | Content to render inside the constrained box.                               |
| `className` | `string`            | —          | Additional classes merged onto the outer wrapper via `cn()`.                |

---

## Styling Notes

- **Outer div** — `relative w-full overflow-hidden rounded-md bg-surface`. The `aspectRatio` CSS property is applied inline from the `ratio` prop.
- **Inner div** — `absolute inset-0`, stretching children to fill the full constrained area. Make sure children use `h-full w-full` and an appropriate `object-fit` (e.g. `object-cover`) to fill correctly.
- **`bg-surface`** — provides a themed fallback background visible while content is loading.
- **`className`** — applied to the outer wrapper, so you can override `rounded-md`, add a border, change the background, etc.

---

## Notes

- The `ratio` prop accepts any positive number. Fractions like `16/9` are evaluated at runtime by JavaScript — you do **not** pass a string.
- Children are absolutely positioned inside the wrapper, so they must be able to fill `position: absolute; inset: 0` naturally (images, iframes, videos, divs with `h-full w-full` all work).
- The component has no intrinsic height — it derives height entirely from the `aspectRatio` CSS property and the width of its container.
