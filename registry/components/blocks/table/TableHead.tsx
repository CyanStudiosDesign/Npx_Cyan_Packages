import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'
interface Props{
    children: ReactNode;
    className ?: string;
}
export const TableHead = ({className ,children}: Props) => {
  return (
    <>
    <td className={cn("p-2 font-medium ",className)}>{children}</td>
    </>
  )
}
