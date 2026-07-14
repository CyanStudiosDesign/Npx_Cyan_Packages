import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  className?: string;
}
export const TableFooter = ({ className, children }: Props) => {
  return (
    <>
      <tfoot
        className={cn(
          "border-t border-border bg-surface hover:bg-subtle font-medium",
          className,
        )}
      >
        {children}
      </tfoot>
    </>
  );
};
