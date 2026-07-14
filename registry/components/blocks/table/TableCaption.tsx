import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'
interface Props{
    children: ReactNode;
    className ?: string;
}
export const TableCaption = ({className ,children}: Props) => {
  return (
    <>
    <div className= {cn("text-fg-muted",className)}>{children}</div>
    </>
  )
}
