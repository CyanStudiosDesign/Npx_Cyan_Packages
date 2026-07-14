# Sidebar

A collapsible sidebar component with expandable navigation sections. Collapses to an icon-only rail view and expands to show labeled items with nested sub-links. All open/collapse state is managed via `SidebarProvider`.

## Import

```tsx
import Sidebar from "@/components/ui/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/provider/SidebarProvider";
```

## Basic Usage

Wrap `Sidebar` in `SidebarProvider` and place it alongside your main content.

```tsx
<SidebarProvider>
  <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-6">{/* Page content */}</main>
  </div>
</SidebarProvider>
```

## Collapsed vs Expanded

The sidebar toggles between two states via the `PanelLeft` button in the header.

```tsx
// Expanded — shows labels, section heading, and nested sub-links
// Collapsed — icon-only rail, labels and sub-links hidden
```

In the collapsed state the sidebar is `w-16`. In the expanded state it is `w-56 sm:w-64 md:w-80`.

## Navigation Sections

The sidebar ships with four built-in sections, each with its own expand/collapse toggle and nested sub-links.

| Section       | Icon       | Sub-links                  |
| ------------- | ---------- | -------------------------- |
| Playground    | `Terminal` | History, Starred, Settings |
| Models        | `Box`      | Genesis, Explorer, Quantum |
| Documentation | `BookOpen` | Introduction, Get Started  |
| Settings      | `Settings` | General, Billing           |

Each section header is a button that toggles its sub-links open. The `ChevronRight` icon rotates 90° when the section is open.

Sub-links animate in with `slide-in-from-top-1` and are indented with a left border line.

## SidebarProvider

`Sidebar` reads all state from `useSidebar()` — the sidebar collapsed state and each section's open/closed state. These are provided by `SidebarProvider`.

| Value              | Type         | Description                                    |
| ------------------ | ------------ | ---------------------------------------------- |
| `collapsed`        | `boolean`    | Whether the sidebar is in icon-only rail mode. |
| `toggleSidebar`    | `() => void` | Toggles collapsed state.                       |
| `playgroundOpen`   | `boolean`    | Whether the Playground section is expanded.    |
| `togglePlayground` | `() => void` | Toggles Playground open/closed.                |
| `modelsOpen`       | `boolean`    | Whether the Models section is expanded.        |
| `toggleModels`     | `() => void` | Toggles Models open/closed.                    |
| `docsOpen`         | `boolean`    | Whether the Documentation section is expanded. |
| `toggleDocs`       | `() => void` | Toggles Documentation open/closed.             |
| `settingsOpen`     | `boolean`    | Whether the Settings section is expanded.      |
| `toggleSettings`   | `() => void` | Toggles Settings open/closed.                  |

## Styling

The component uses design tokens from `globals.css`, such as:

- `--color-canvas`
- `--color-border`
- `--color-fg`
- `--color-fg-muted`
- `--color-fg-subtle`
- `--color-subtle`
- `focus-ring-visible`

Width transitions use `transition-all duration-200`. Label and sub-link sections animate in with `animate-in fade-in duration-150` and `animate-in slide-in-from-top-1 duration-150`.

```tsx
// To change expanded width, update the width classes on the inner div
collapsed ? "w-16" : "w-56 sm:w-64 md:w-80";
```

## Notes

- `Sidebar` is a `"use client"` component and must run in the browser.
- `Sidebar` must be rendered inside `SidebarProvider` — it calls `useSidebar()` which throws if no provider is found.
- Sub-links are currently plain `<button>` elements with no `onClick` handlers. Wire them up to your router (e.g. `router.push()` or `<Link>`) for navigation.
- The "Platform" section label above the nav items is hardcoded and only visible when the sidebar is expanded.
- `lucide-react` is required for all icons (`PanelLeft`, `Terminal`, `Box`, `BookOpen`, `Settings`, `ChevronRight`).
- The `cn()` utility from `@/lib/utils` is required.
