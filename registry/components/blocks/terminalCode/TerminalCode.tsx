"use client";

import {
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";

export type TerminalCodePackageManager = {
  value: string;
  label: string;
};

export type TerminalCodeCommandGroup = {
  value: string;
  label: string;
  description?: string;
  commands: Record<string, string>;
};

export type TerminalCodeProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode;
  description?: ReactNode;
  showHeader?: boolean;
  inverted?: boolean;
  commandGroups?: TerminalCodeCommandGroup[];
  packageManagers?: TerminalCodePackageManager[];
  defaultGroup?: string;
  defaultPackageManager?: string;
  copyLabel?: string;
  copiedLabel?: string;
  showShortcuts?: boolean;
  onCopy?: (command: string) => void;
};

export type GetStartedPackageManager = TerminalCodePackageManager;
export type GetStartedCommandGroup = TerminalCodeCommandGroup;
export type GetStartedBlockProps = TerminalCodeProps;

const defaultPackageManagers: TerminalCodePackageManager[] = [
  { value: "npm", label: "npm" },
  { value: "yarn", label: "yarn" },
  { value: "pnpm", label: "pnpm" },
  { value: "bun", label: "bun" },
];

const defaultCommandGroups: TerminalCodeCommandGroup[] = [
  {
    value: "cli",
    label: "CLI",
    description: "Install the Cyan UI command-line tool.",
    commands: {
      npm: "npm install -g cyan-ui-library@latest",
      yarn: "yarn global add cyan-ui-library@latest",
      pnpm: "pnpm add -g cyan-ui-library@latest",
      bun: "bun add -g cyan-ui-library@latest",
    },
  },
  {
    value: "init",
    label: "Init",
    description: "Initialize components, tokens, and docs scaffolding.",
    commands: {
      npm: "npx cyan-ui-library init",
      yarn: "yarn dlx cyan-ui-library init",
      pnpm: "pnpm dlx cyan-ui-library init",
      bun: "bunx cyan-ui-library init",
    },
  },
];

export function TerminalCode({
  title,
  description,
  showHeader = false,
  inverted = false,
  commandGroups = defaultCommandGroups,
  packageManagers = defaultPackageManagers,
  defaultGroup,
  defaultPackageManager,
  copyLabel = "Copy command",
  copiedLabel = "Copied",
  showShortcuts = false,
  onCopy,
  className,
  ...props
}: TerminalCodeProps) {
  const firstGroup = commandGroups[0];
  const firstPackageManager = packageManagers[0];
  const [activeGroup, setActiveGroup] = useState(
    defaultGroup ?? firstGroup?.value ?? ""
  );
  const [packageManager, setPackageManager] = useState(
    defaultPackageManager ?? firstPackageManager?.value ?? ""
  );
  const [packageMenuOpen, setPackageMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeGroupIndex = Math.max(
    commandGroups.findIndex((group) => group.value === activeGroup),
    0
  );
  const selectedGroup = commandGroups[activeGroupIndex] ?? firstGroup;
  const selectedPackageManager =
    packageManagers.find((item) => item.value === packageManager) ??
    firstPackageManager;
  const command = selectedGroup?.commands[selectedPackageManager?.value ?? ""];
  const resolvedCommand =
    command ?? Object.values(selectedGroup?.commands ?? {})[0] ?? "";
  const palette = getTerminalCodePalette(inverted);

  const shortcutHelp = useMemo(() => {
    if (!showShortcuts) return null;

    return [
      { keys: "⌘/Ctrl C", label: "copy" },
      { keys: "⌘/Ctrl 1-9", label: "switch tab" },
      { keys: "← →", label: "move tabs" },
    ];
  }, [showShortcuts]);

  async function copyCommand() {
    if (!resolvedCommand) return;

    await navigator.clipboard.writeText(resolvedCommand);
    setCopied(true);
    onCopy?.(resolvedCommand);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function handleRootKeyDown(event: KeyboardEvent<HTMLElement>) {
    const metaPressed = event.metaKey || event.ctrlKey;

    if (metaPressed && event.key.toLowerCase() === "c") {
      event.preventDefault();
      void copyCommand();
      return;
    }

    if (metaPressed && /^[1-9]$/.test(event.key)) {
      const nextIndex = Number(event.key) - 1;
      const nextGroup = commandGroups[nextIndex];
      if (nextGroup) {
        event.preventDefault();
        setActiveGroup(nextGroup.value);
      }
    }
  }

  function handleTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (activeGroupIndex + direction + commandGroups.length) %
      commandGroups.length;
    const nextGroup = commandGroups[nextIndex];

    if (nextGroup) {
      setActiveGroup(nextGroup.value);
    }
  }

  function handlePackageMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setPackageMenuOpen(false);
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();
    const currentIndex = Math.max(
      packageManagers.findIndex((item) => item.value === packageManager),
      0
    );
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + packageManagers.length) %
      packageManagers.length;
    const nextManager = packageManagers[nextIndex];

    if (nextManager) {
      setPackageManager(nextManager.value);
    }
  }

  return (
    <section
      className={cn(
        "w-full max-w-2xl",
        palette.root,
        className
      )}
      onKeyDown={handleRootKeyDown}
      {...props}
    >
      {showHeader && (title || description) ? (
        <div className="mx-auto mb-8 max-w-xl text-center">
          {title ? (
            <h2 className={cn("text-3xl font-semibold tracking-tight", palette.text)}>
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={cn("mt-3 text-sm leading-normal", palette.muted)}>
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn("w-full overflow-visible rounded-radius border", palette.card)}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b px-5 pt-1",
            palette.border
          )}
        >
          <div
            role="tablist"
            aria-label="Command type"
            className="flex min-w-0 gap-1"
            onKeyDown={handleTabsKeyDown}
          >
            {commandGroups.map((group) => {
              const selected = activeGroup === group.value;

              return (
                <button
                  key={group.value}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  className={cn(
                    "focus-ring-visible relative px-3 py-3 text-sm font-medium transition-colors duration-150",
                    selected ? palette.activeTab : palette.tab
                  )}
                  onClick={() => setActiveGroup(group.value)}
                >
                  {group.label}
                  {selected ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] rounded-full",
                        palette.tabIndicator
                      )}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="relative" onKeyDown={handlePackageMenuKeyDown}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={packageMenuOpen}
              className={cn(
                "focus-ring-visible flex items-center gap-1.5 rounded-radius border px-3 py-1.5 text-sm transition-colors duration-150",
                palette.packageButton
              )}
              onClick={() => setPackageMenuOpen((open) => !open)}
            >
              {selectedPackageManager?.label ?? packageManager}
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform",
                  packageMenuOpen && "rotate-180"
                )}
              />
            </button>

            {packageMenuOpen ? (
              <div
                role="listbox"
                aria-label="Package manager"
                className={cn(
                  "absolute right-0 top-full z-[var(--z-dropdown)] mt-1.5 w-28 overflow-hidden rounded-radius border py-1 shadow-lg",
                  palette.menu
                )}
              >
                {packageManagers.map((item) => {
                  const selected = packageManager === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={cn(
                        "focus-ring-visible flex w-full rounded-radius px-3 py-2 text-left text-sm transition-colors",
                        selected ? palette.menuItemActive : palette.menuItem
                      )}
                      onClick={() => {
                        setPackageManager(item.value);
                        setPackageMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 px-5 py-5">
            {selectedGroup?.description ? (
              <p className={cn("text-sm", palette.muted)}>
                {selectedGroup.description}
              </p>
            ) : null}

            <div className="flex items-center justify-between gap-3">
              <code
                className={cn(
                  "min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm tracking-tight",
                  palette.text
                )}
              >
                <span className={cn("mr-2", palette.subtle)}>~</span>
                {resolvedCommand}
              </code>
              <button
                type="button"
                aria-label={copyLabel}
                className={cn(
                  "focus-ring-visible grid size-9 shrink-0 place-items-center rounded-radius transition-colors",
                  palette.copyButton
                )}
                onClick={() => void copyCommand()}
              >
                {copied ? (
                  <Check aria-hidden="true" className="size-4 text-success" />
                ) : (
                  <Clipboard aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>

            {shortcutHelp ? (
              <div className={cn("flex flex-wrap gap-2 text-xs", palette.muted)}>
                {shortcutHelp.map((shortcut) => (
                  <span
                    key={shortcut.keys}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                      palette.shortcut
                    )}
                  >
                    <kbd className={cn("font-mono", palette.text)}>
                      {shortcut.keys}
                    </kbd>
                    {shortcut.label}
                  </span>
                ))}
              </div>
            ) : null}

            <span
              aria-live="polite"
              className="sr-only"
            >
              {copied ? copiedLabel : ""}
            </span>
        </div>
      </div>
    </section>
  );
}

function getTerminalCodePalette(inverted: boolean) {
  if (inverted) {
    return {
      root: "text-fg-inverse",
      card: "border-fg-inverse/10 bg-fg-inverse/5",
      border: "border-fg-inverse/10",
      text: "text-fg-inverse",
      muted: "text-fg-inverse/55",
      subtle: "text-fg-inverse/35",
      tab: "text-fg-inverse/50 hover:text-fg-inverse",
      activeTab: "text-fg-inverse",
      tabIndicator: "bg-fg-inverse",
      packageButton:
        "border-fg-inverse/10 bg-fg-inverse/5 text-fg-inverse/65 hover:bg-fg-inverse/10 hover:text-fg-inverse",
      menu: "border-fg-inverse/10 bg-inverse",
      menuItem: "text-fg-inverse/65 hover:bg-fg-inverse/10 hover:text-fg-inverse",
      menuItemActive: "bg-fg-inverse/10 text-fg-inverse",
      copyButton:
        "border border-fg-inverse/10 bg-fg-inverse/5 text-fg-inverse/65 hover:bg-fg-inverse/10 hover:text-fg-inverse",
      shortcut: "border-fg-inverse/10 bg-fg-inverse/5",
    };
  }

  return {
    root: "text-fg",
    card: "border-border bg-surface/30",
    border: "border-border",
    text: "text-fg",
    muted: "text-fg-muted",
    subtle: "text-fg-subtle",
    tab: "text-fg-subtle hover:text-fg-muted",
    activeTab: "text-fg",
    tabIndicator: "bg-fg",
    packageButton:
      "border-border bg-subtle/30 text-fg-muted hover:bg-subtle hover:text-fg",
    menu: "border-border bg-surface",
    menuItem: "text-fg-muted hover:bg-subtle hover:text-fg",
    menuItemActive: "bg-subtle text-fg",
    copyButton:
      "border border-border bg-surface text-fg-muted hover:bg-subtle hover:text-fg",
    shortcut: "border-border bg-canvas",
  };
}

export const GetStartedBlock = TerminalCode;

export default TerminalCode;
