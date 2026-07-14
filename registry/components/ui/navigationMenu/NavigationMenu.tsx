"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/buttons/Buttons";
import { cn } from "@/lib/utils";
import { menuItems, type MenuName, menus } from "./NavigationMenuData";

export default function NavigationMenu() {
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const pathname = usePathname();

  return (
    <nav className="rounded-md border border-border bg-surface px-4 py-3 shadow-sm">
      <ul className="flex list-none items-center gap-2">
        {menus.map((menu) => (
          <li
            key={menu.value}
            className="relative"
            onMouseEnter={() => setActiveMenu(menu.value)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Button
              type="button"
              variant="subtle"
              className={cn(
                "h-9",
                activeMenu === menu.value &&
                  "border-primary bg-surface text-primary shadow-sm"
              )}
            >
              {menu.label}
            </Button>

            {activeMenu === menu.value && (
              <div className="absolute left-0 top-full z-50 pt-2">
                <div className="w-80 rounded-md border border-border bg-surface p-2 shadow-md">
                  {menuItems[menu.value].map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        pathname === item.href.split("?")[0].split("#")[0] && "bg-subtle text-primary"
                      )}
                    >
                      <span className="block text-sm font-medium text-fg">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs leading-normal text-fg-muted">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}