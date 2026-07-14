import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export const TableBody = ({ className, children }: Props) => {
  return (
    <>
      <tbody
        className={cn( className)}
      >
        {children}
      </tbody>
    </>
  );
};
