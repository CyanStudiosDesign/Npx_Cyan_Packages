import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'
interface Props{
    children: ReactNode;
    className ?: string;
}
export const TableRow = ({className ,children}: Props) => {
  return (
    <>
    <tr className={cn("hover:subtle border-b border-border ",className)}>{children}</tr>
    </>
  )
}
