# Terminal Code

A reusable command launcher block for install/init sections. It supports custom command groups, package managers, copy feedback, and keyboard shortcuts.

## Import

```tsx
import { TerminalCode } from "@/components/blocks/terminal-code";
```

## Usage

```tsx
export default function Example() {
  return <TerminalCode />;
}
```

## Custom Commands

```tsx
<TerminalCode
  title="Install your design system"
  commandGroups={[
    {
      value: "install",
      label: "Install",
      description: "Add the package to your project.",
      commands: {
        npm: "npm install cyan-ui-library",
        pnpm: "pnpm add cyan-ui-library",
      },
    },
  ]}
  packageManagers={[
    { value: "npm", label: "npm" },
    { value: "pnpm", label: "pnpm" },
  ]}
/>
```

`GetStartedBlock` remains available as a backwards-compatible alias.

## Keyboard

- `Cmd/Ctrl + C` copies the active command.
- `Cmd/Ctrl + 1-9` switches command groups.
- `ArrowLeft` and `ArrowRight` move between tabs when focus is inside the tablist.
- `ArrowUp`, `ArrowDown`, and `Escape` work inside the package manager menu.
