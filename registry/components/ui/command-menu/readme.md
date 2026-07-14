# Command Menu Component

A compound command palette component with a modal overlay, live search filtering, grouped items, keyboard shortcuts, and an empty state. All sub-components share state via React context.

## Import

```tsx
import {
  Command,
  CommandTrigger,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command/Command";
```

## Basic Usage

```tsx
<Command>
  <CommandTrigger>Open Command Palette</CommandTrigger>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem onSelect={() => console.log("New file")}>
        New File
      </CommandItem>
      <CommandItem onSelect={() => console.log("Save")}>Save</CommandItem>
    </CommandGroup>
    <CommandEmpty>No results found.</CommandEmpty>
  </CommandList>
</Command>
```

## With Shortcuts and Separator

```tsx
<Command>
  <CommandTrigger>Search</CommandTrigger>
  <CommandInput />
  <CommandList>
    <CommandGroup heading="Navigation">
      <CommandItem onSelect={() => router.push("/dashboard")}>
        Dashboard
        <CommandShortcut>⌘D</CommandShortcut>
      </CommandItem>
      <CommandItem onSelect={() => router.push("/settings")}>
        Settings
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Account">
      <CommandItem onSelect={() => signOut()}>Sign Out</CommandItem>
    </CommandGroup>
    <CommandEmpty>No results found.</CommandEmpty>
  </CommandList>
</Command>
```

## Controlled Usage

Manage open state from outside the component using `open` and `onOpenChange`.

```tsx
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open</button>

<Command open={open} onOpenChange={setOpen}>
  <CommandInput />
  <CommandList>
    <CommandItem onSelect={() => {}}>Option A</CommandItem>
  </CommandList>
</Command>
```

## Global Keyboard Shortcut

Enable `⌘K` / `Ctrl+K` to toggle the palette from anywhere on the page.

```tsx
<Command enableGlobalShortcut>
  <CommandInput />
  <CommandList>
    <CommandItem onSelect={() => {}}>Option A</CommandItem>
  </CommandList>
</Command>
```

## Props

## Command

| Prop                   | Type                      | Default     | Description                                                          |
| ---------------------- | ------------------------- | ----------- | -------------------------------------------------------------------- |
| `children`             | `ReactNode`               | Required    | Sub-components to render inside the command palette.                 |
| `open`                 | `boolean`                 | `undefined` | Controlled open state. Use with `onOpenChange` for controlled usage. |
| `onOpenChange`         | `(open: boolean) => void` | `undefined` | Callback fired when the open state changes.                          |
| `enableGlobalShortcut` | `boolean`                 | `false`     | Enables `⌘K` / `Ctrl+K` to toggle the palette globally.              |

## CommandTrigger

| Prop        | Type        | Default     | Description                                |
| ----------- | ----------- | ----------- | ------------------------------------------ |
| `children`  | `ReactNode` | Required    | Content of the trigger button.             |
| `className` | `string`    | `undefined` | Adds custom classes to the trigger button. |

## CommandInput

| Prop          | Type     | Default                         | Description                               |
| ------------- | -------- | ------------------------------- | ----------------------------------------- |
| `placeholder` | `string` | `"Type a command or search..."` | Placeholder text for the search input.    |
| `className`   | `string` | `undefined`                     | Adds custom classes to the input element. |

`CommandInput` also accepts all standard `input` props.

## CommandList

| Prop        | Type        | Default     | Description                                                   |
| ----------- | ----------- | ----------- | ------------------------------------------------------------- |
| `children`  | `ReactNode` | Required    | `CommandGroup`, `CommandItem`, and `CommandEmpty` components. |
| `className` | `string`    | `undefined` | Adds custom classes to the list wrapper.                      |

## CommandGroup

| Prop        | Type        | Default     | Description                                                           |
| ----------- | ----------- | ----------- | --------------------------------------------------------------------- |
| `children`  | `ReactNode` | Required    | `CommandItem` components for this group.                              |
| `heading`   | `string`    | `undefined` | Group label shown above the items. Hidden when the user is searching. |
| `className` | `string`    | `undefined` | Adds custom classes to the group wrapper.                             |

## CommandItem

| Prop        | Type         | Default     | Description                                                                |
| ----------- | ------------ | ----------- | -------------------------------------------------------------------------- |
| `children`  | `ReactNode`  | Required    | Content of the item — text, icons, `CommandShortcut`.                      |
| `onSelect`  | `() => void` | `undefined` | Callback fired when the item is clicked. The palette closes automatically. |
| `disabled`  | `boolean`    | `false`     | Disables the item.                                                         |
| `keywords`  | `string[]`   | `[]`        | Extra search terms to match against, in addition to the visible text.      |
| `className` | `string`     | `undefined` | Adds custom classes to the item button.                                    |

## CommandEmpty

| Prop        | Type        | Default     | Description                                           |
| ----------- | ----------- | ----------- | ----------------------------------------------------- |
| `children`  | `ReactNode` | Required    | Message to show when no items match the search query. |
| `className` | `string`    | `undefined` | Adds custom classes to the empty state wrapper.       |

## CommandShortcut

| Prop        | Type        | Default     | Description                                      |
| ----------- | ----------- | ----------- | ------------------------------------------------ |
| `children`  | `ReactNode` | Required    | Shortcut label to display (e.g. `⌘K`, `Ctrl+S`). |
| `className` | `string`    | `undefined` | Adds custom classes to the shortcut span.        |

## CommandSeparator

| Prop            | Type      | Default     | Description                                                                                      |
| --------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `className`     | `string`  | `undefined` | Adds custom classes to the separator element.                                                    |
| `alwaysVisible` | `boolean` | `false`     | Forces the separator to show even when the user is searching. By default it hides during search. |

## Search Behavior

`CommandInput` filters `CommandItem` components in real time. An item is visible if its text content or any of its `keywords` include the search query (case-insensitive). Use `keywords` to add hidden aliases.

```tsx
// Matches "new file", "create", and "add document"
<CommandItem keywords={["create", "add document"]}>New File</CommandItem>
```

Group headings and `CommandSeparator` are hidden automatically while searching.

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-surface`
- `--color-border`
- `--color-fg`
- `--color-fg-muted`
- `--color-fg-subtle`
- `--color-subtle`
- `--shadow-2xl`
- `focus-ring-visible`

The modal panel is always `w-xs` and centered in the viewport. To change the width update the class directly on the inner container div.

```tsx
// Default
<div className="w-xs ...">

// Wider
<div className="w-sm ...">
```

## Notes

- `Command` is a `"use client"` component and must run in the browser.
- All sub-components must be rendered inside a `<Command>` wrapper — they read open state and search query via React context and will throw if used outside.
- The palette closes automatically when an item is selected, when `Escape` is pressed, or when the user clicks outside the modal.
- When the palette is open, `document.body` overflow is set to `hidden` to prevent background scrolling.
- `CommandTrigger` must be a direct child of `Command` — it is extracted from children and rendered outside the modal overlay.
- `CommandEmpty` only renders when the search query is non-empty and no items are visible.
- `lucide-react` is required for the `Search` icon used in `CommandInput`.
