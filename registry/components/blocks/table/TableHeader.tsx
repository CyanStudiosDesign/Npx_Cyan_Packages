import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'
interface Props{
    children: ReactNode;
    className ?: string;
}
export const TableHeader = ({className ,children}: Props) => {
  return (
    <>
    <thead className= {cn(className)}>{children}</thead>
    </>
  )
}
