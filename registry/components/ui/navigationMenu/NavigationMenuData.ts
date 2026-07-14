export type MenuName = "getting-started" | "components" | "docs";

export interface MenuItem {
  title: string;
  description: string;
  href: string;
}

export const menuItems: Record<MenuName, MenuItem[]> = {
  "getting-started": [
    {
      title: "Introduction",
      description: "Learn what Cyan UI is and how to use it.",
      href: "/dev/docs",
    },
    {
      title: "Installation",
      description: "Set up the library in your project.",
      href: "/dev/docs#installation",
    },
    {
      title: "Theme Tokens",
      description: "Use colors, spacing, radius, and typography tokens.",
      href: "/dev/docs#tokens",
    },
  ],
  components: [
  {
    title: "Accordion",
    description: "Show and hide sections of content.",
    href: "/dev/preview?component=accordion",
  },
  {
    title: "Button",
    description: "Trigger actions with different button styles.",
    href: "/dev/preview?component=button",
  },
  {
    title: "Typography",
    description: "Render consistent text styles.",
    href: "/dev/preview?component=typography",
  },
],
  docs: [
    {
      title: "Docs Page",
      description: "Open the full documentation page.",
      href: "/dev/docs",
    },
    {
      title: "Preview Page",
      description: "View every component in one place.",
      href: "/dev/preview",
    },
    {
      title: "Sandbox Page",
      description: "Test components while building.",
      href: "/dev/sandbox",
    },
  ],
};

export const menus: { label: string; value: MenuName }[] = [
  { label: "Getting Started", value: "getting-started" },
  { label: "Components", value: "components" },
  { label: "Docs", value: "docs" },
];