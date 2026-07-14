# AvatarProfile

A simple avatar component that displays a circular profile image. If the image fails to load, it automatically shows a text-based fallback instead.

## Import

```tsx
import AvatarProfile from "@/components/ui/avatar/AvatarProfile";
```

## Basic Usage

```tsx
<AvatarProfile
  imageUrl="https://example.com/photo.jpg"
  imageAlt="Jane Doe"
  fallbackText="JD"
/>
```

## With Fallback Text

Use `fallbackText` to show initials or a short label when the image URL is broken or fails to load.

```tsx
<AvatarProfile
  imageUrl="https://example.com/broken.jpg"
  imageAlt="Jane Doe"
  fallbackText="JD"
/>
```

The component detects the image error automatically and switches to the fallback without any extra configuration.

## Props

## AvatarProfile

| Prop           | Type     | Default  | Description                                                              |
| -------------- | -------- | -------- | ------------------------------------------------------------------------ |
| `imageUrl`     | `string` | Required | URL of the profile image to display.                                     |
| `imageAlt`     | `string` | Required | Alt text for the image, used for accessibility.                          |
| `fallbackText` | `string` | Required | Text shown when the image fails to load. Typically initials like `"JD"`. |

## Image vs Fallback

Use a valid image URL when the profile photo is available.

```tsx
<AvatarProfile
  imageUrl="https://example.com/photo.jpg"
  imageAlt="Jane Doe"
  fallbackText="JD"
/>
```

Pass any URL when no photo exists — the fallback text will display automatically on error.

```tsx
<AvatarProfile imageUrl="" imageAlt="Unknown User" fallbackText="?" />
```

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-border`
- `--radius-full`
- `--color-subtle`
- `--color-fg`
- `--text-sm`
- `--font-medium`

The avatar is always `h-14 w-14` (56×56px) and fully circular. You can wrap it in a container to control positioning or spacing.

```tsx
<div className="flex items-center gap-3">
  <AvatarProfile
    imageUrl="https://example.com/photo.jpg"
    imageAlt="Jane Doe"
    fallbackText="JD"
  />
  <span className="text-fg text-sm">Jane Doe</span>
</div>
```

## Notes

- The avatar is always `56×56px`. There is no size prop — extend the component if other sizes are needed.
- `fallbackText` is not truncated automatically. Keep it short (1–3 characters) to avoid overflow.
- `imageAlt` is passed directly to the Next.js `Image` tag and is required for accessibility.
- The component uses Next.js `Image` with `fill` and `object-cover`, so the parent container must have `position: relative` and defined dimensions — this is already handled internally.
- The fallback state resets if the component unmounts and remounts.
