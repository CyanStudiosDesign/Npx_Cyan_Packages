# Navigation Menu

A simple hover-based navigation menu for grouping links. It supports multiple menu groups, dropdown content, and link navigation using Next.js `Link`.

## Import

```tsx
import NavigationMenu from "@/components/ui/navigationMenu/NavigationMenu";
```

## Basic Usage

```tsx
<NavigationMenu />
```

## Example

```tsx
import NavigationMenu from "@/components/ui/navigationMenu/NavigationMenu";

export default function Page() {
  return (
    <main className="min-h-screen bg-canvas p-8">
      <NavigationMenu />
    </main>
  );
}
```

## Menu Data

The menu items are stored separately in `NavigationMenuData.ts`.

```ts
export type MenuName = "getting-started" | "components" | "docs";

export interface MenuItem {
  title: string;
  description: string;
  href: string;
}
```

Each menu group has a list of links.

```ts
export const menuItems: Record<MenuName, MenuItem[]> = {
  "getting-started": [
    {
      title: "Introduction",
      description: "Learn what Cyan UI is and how to use it.",
      href: "/dev/docs",
    },
  ],
  components: [
    {
      title: "Accordion",
      description: "Show and hide sections of content.",
      href: "/dev/preview",
    },
  ],
  docs: [
    {
      title: "Docs Page",
      description: "Open the full documentation page.",
      href: "/dev/docs",
    },
  ],
};
```

The top-level menu buttons are controlled by the `menus` array.

```ts
export const menus: { label: string; value: MenuName }[] = [
  { label: "Getting Started", value: "getting-started" },
  { label: "Components", value: "components" },
  { label: "Docs", value: "docs" },
];
```

## Adding a New Menu Group

First, add the new group name to `MenuName`.

```ts
export type MenuName = "getting-started" | "components" | "docs" | "resources";
```

Then add the group to `menuItems`.

```ts
resources: [
  {
    title: "Examples",
    description: "View examples for building layouts.",
    href: "/dev/examples",
  },
],
```

Finally, add it to `menus`.

```ts
{ label: "Resources", value: "resources" }
```

## Adding a New Link

Add a new item inside the correct group.

```ts
components: [
  {
    title: "Button",
    description: "Trigger actions with different button styles.",
    href: "/dev/preview",
  },
  {
    title: "Typography",
    description: "Render consistent text styles.",
    href: "/dev/preview",
  },
],
```

## Props

### NavigationMenu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| None | - | - | The component currently reads all menu groups and items from `NavigationMenuData.ts`. |

### MenuItem

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | The main text shown in the dropdown item. |
| `description` | `string` | Supporting text shown below the title. |
| `href` | `string` | The route or URL the item links to. |

### MenuName

| Value | Description |
|-------|-------------|
| `getting-started` | Links for setup or introductory pages. |
| `components` | Links for component examples. |
| `docs` | Links for documentation pages. |

## How Navigation Works

The component uses Next.js `Link` for navigation.

```tsx
<Link href={item.href}>
  {item.title}
</Link>
```

For a link to work, the `href` must point to an existing route inside `src/app`.

For example, this link: