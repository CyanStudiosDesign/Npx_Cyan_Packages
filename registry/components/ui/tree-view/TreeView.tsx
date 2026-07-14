"use client";

import { createContext, ReactNode, useContext } from "react";
import { FileText, Folder } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type TreeLevelContextValue = {
  level: number;
};

const TreeLevelContext = createContext<TreeLevelContextValue>({ level: 0 });

type TreeViewProps = {
  label?: string;
  id?: string;
  defaultOpenIds?: string[];
  className?: string;
  children: ReactNode;
};

type TreeFolderProps = {
  label: string;
  id?: string;
  children: ReactNode;
};

type TreeItemProps = {
  label: string;
};

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function TreeFolder({ label, id, children }: TreeFolderProps) {
  const { level } = useContext(TreeLevelContext);
  const value = id ?? slug(label);
  const paddingLeft = `${level * 24 + 12}px`;

  return (
    <AccordionItem value={value} className="border-b-0">
      <AccordionTrigger
        data-level={level}
        className="tree-view-row rounded-md border-0 py-2 text-sm"
        style={{ paddingLeft }}
      >
        <span className="flex items-center gap-2">
          <Folder className="size-4 shrink-0 text-primary" />
          {label}
        </span>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-1 pt-0">
        <TreeLevelContext.Provider value={{ level: level + 1 }}>
          <div className="tree-view-branch space-y-1" role="group">
            {children}
          </div>
        </TreeLevelContext.Provider>
      </AccordionContent>
    </AccordionItem>
  );
}

export function TreeItem({ label }: TreeItemProps) {
  const { level } = useContext(TreeLevelContext);
  const paddingLeft = `${level * 24 + 12}px`;

  return (
    <div
      data-level={level}
      aria-selected={false}
      className="tree-view-row flex items-center gap-2 rounded-md px-3 py-2 text-sm text-fg-muted"
      role="treeitem"
      style={{ paddingLeft }}
    >
      <FileText className="size-4 shrink-0 text-fg-subtle" />
      <span>{label}</span>
    </div>
  );
}

export default function TreeView({
  label,
  id,
  defaultOpenIds = [],
  className,
  children,
}: TreeViewProps) {
  return (
    <Accordion
      className={cn("max-w-md border-0 bg-transparent", className)}
      defaultValue={defaultOpenIds}
      type="multiple"
    >
      <div className="tree-view space-y-1" role="tree">
        <TreeLevelContext.Provider value={{ level: 0 }}>
          {label ? (
            <TreeFolder label={label} id={id ?? slug(label)}>
              {children}
            </TreeFolder>
          ) : (
            children
          )}
        </TreeLevelContext.Provider>
      </div>
    </Accordion>
  );
}