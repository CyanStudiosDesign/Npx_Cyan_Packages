"use client";

import {
  PanelLeft,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Settings,
  Box,
  Terminal,
} from "lucide-react";

import { useSidebar } from "@/components/ui/provider/SidebarProvider";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const {
    collapsed,
    toggleSidebar,

    playgroundOpen,
    togglePlayground,

    modelsOpen,
    toggleModels,

    docsOpen,
    toggleDocs,

    settingsOpen,
    toggleSettings,
  } = useSidebar();

  return (
    <div className="flex bg-canvas h-full">
      <div
        className={cn(
          "bg-canvas border-r border-border transition-all duration-200",
          collapsed ? "w-16" : "w-56 sm:w-64 md:w-80",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header Toggle Area */}
          <div
            className={cn(
              "flex items-center p-2 sm:p-3 md:p-4 border-b border-border min-h-16.25",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <button
              type="button"
              onClick={toggleSidebar}
              className={cn(
                "p-2 rounded-md border border-border bg-canvas hover:bg-subtle focus-ring-visible shrink-0",
              )}
            >
              <PanelLeft className="h-5 w-5 text-fg shrink-0" />
            </button>

            {!collapsed && (
              <span className="text-sm font-medium text-fg-muted animate-in fade-in duration-200">
                Menu
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="px-3 sm:px-4 md:px-6 py-2.5 text-xs font-bold tracking-wider text-fg-muted uppercase mt-2">
              Platform
            </div>
          )}

          {/* Navigation Action Container */}
          <div
            className={cn(
              "flex-1 px-2 sm:px-3 mt-1",
              collapsed && "flex flex-col items-center",
            )}
          >
            <div className="space-y-1 w-full">
              {/* Item 1: Playground */}
              <button
                type="button"
                onClick={togglePlayground}
                className={cn(
                  "w-full flex items-center gap-3 py-3 rounded-full hover:bg-subtle text-fg focus-ring-visible transition-colors",
                  collapsed ? "justify-center px-0" : "px-3",
                )}
              >
                <Terminal className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between min-w-0 animate-in fade-in duration-150">
                    <span className="truncate text-sm">Playground</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
                        playgroundOpen && "rotate-90",
                      )}
                    />
                  </div>
                )}
              </button>

              {!collapsed && playgroundOpen && (
                <div className="ml-4 flex flex-col border-l border-border pl-4 animate-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    History
                  </button>
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Starred
                  </button>
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Settings
                  </button>
                </div>
              )}

              {/* Item 2: Models */}
              <button
                type="button"
                onClick={toggleModels}
                className={cn(
                  "w-full flex items-center gap-3 py-3 rounded-full hover:bg-subtle text-fg focus-ring-visible transition-colors",
                  collapsed ? "justify-center px-0" : "px-3",
                )}
              >
                <Box className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between min-w-0 animate-in fade-in duration-150">
                    <span className="truncate text-sm">Models</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
                        modelsOpen && "rotate-90",
                      )}
                    />
                  </div>
                )}
              </button>

              {!collapsed && modelsOpen && (
                <div className="ml-4 flex flex-col border-l border-border pl-4 animate-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Genesis
                  </button>
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Explorer
                  </button>
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Quantum
                  </button>
                </div>
              )}

              {/* Item 3: Documentation */}
              <button
                type="button"
                onClick={toggleDocs}
                className={cn(
                  "w-full flex items-center gap-3 py-3 rounded-full hover:bg-subtle text-fg focus-ring-visible transition-colors",
                  collapsed ? "justify-center px-0" : "px-3",
                )}
              >
                <BookOpen className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between min-w-0 animate-in fade-in duration-150">
                    <span className="truncate text-sm">Documentation</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
                        docsOpen && "rotate-90",
                      )}
                    />
                  </div>
                )}
              </button>

              {!collapsed && docsOpen && (
                <div className="ml-4 flex flex-col border-l border-border pl-4 animate-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Introduction
                  </button>
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Item 4: Settings */}
              <button
                type="button"
                onClick={toggleSettings}
                className={cn(
                  "w-full flex items-center gap-3 py-3 rounded-full hover:bg-subtle text-fg focus-ring-visible transition-colors",
                  collapsed ? "justify-center px-0" : "px-3",
                )}
              >
                <Settings className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between min-w-0 animate-in fade-in duration-150">
                    <span className="truncate text-sm">Settings</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
                        settingsOpen && "rotate-90",
                      )}
                    />
                  </div>
                )}
              </button>

              {!collapsed && settingsOpen && (
                <div className="ml-4 flex flex-col border-l border-border pl-4 animate-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    General
                  </button>
                  <button
                    type="button"
                    className="py-2 text-left text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    Billing
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
