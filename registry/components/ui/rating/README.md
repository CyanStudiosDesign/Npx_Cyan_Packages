# Rating

A flexible rating component system with two modes:

- Interactive Rating (Full) → user can click and change value  
- Static Rating (Half) → read-only support with 0.5 precision  

Both can be used together in a single UI or separately depending on use case.

---

## Import

```ts
import { Rating } from "@/components/ui/rating";
```

---

## Basic Usage (Interactive Rating)

```tsx
<Rating.Full value={3} onChange={setValue} />
```

This version:
- Supports click interaction
- Supports hover preview
- Only allows full-star values (no 0.5 steps)

---

## Static Rating (Half Precision)

```tsx
<Rating.Half value={4.5} />
```

This version:
- Read-only
- Supports half-star values (e.g., 3.5, 4.5)
- Used for reviews or display-only UI

---

## Combined Usage (Both in One UI)

```tsx
<Rating.Full value={3} onChange={setValue} />

<Rating.Half value={4.5} />
```

---

## Registry Example (UI Preview Setup)

```tsx
{
  id: "rating",
  name: "Rating",
  category: "UI",
  preview: (() => {
    const Preview = () => {
      const [value, setValue] = React.useState(3);

      return (
        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <span className="text-sm text-fg-muted">
              Interactive Rating
            </span>

            <Rating.Full value={value} onChange={setValue} />

            <span className="text-xs text-fg-muted">
              {value} / 5 stars
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-fg-muted">
              Static Rating
            </span>

            <Rating.Half value={4.5} />

            <span className="text-xs text-fg-muted">
              4.5 / 5 stars
            </span>
          </div>

        </div>
      );
    };

    return <Preview />;
  })(),
}
```

---

## Props

### Rating.Full

- value: number (required)
- onChange: (value: number) => void (optional)
- totalStars: number (default 5)
- className: string (optional)

---

### Rating.Half

- value: number (required)
- totalStars: number (default 5)
- className: string (optional)

---

## Behavior

### Rating.Full
- Click to set rating
- Hover preview animation
- No half-star selection

### Rating.Half
- Display-only
- Supports 0.5 values
- No interaction

---

## Styling

Uses Tailwind tokens:

- text-yellow-400
- text-gray-300
- transition-transform

Customize using className.

---

## Notes

- Rating.Full is interactive only
- Rating.Half is static only
- Both can be used together in one layout
- Do not mix interaction logic in Rating.Half
- Always import via Rating object
