import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export const Table = ({ className, children }: Props) => {
  return (
    <>
      <table
        className={cn( "w-[500px] border-collapse text-fg",className)}
      >
        {children}
      </table>
    </>
  );
};
