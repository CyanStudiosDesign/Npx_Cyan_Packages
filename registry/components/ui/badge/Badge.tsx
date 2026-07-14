import React from 'react';
import { cn } from '@/lib/utils'; 

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSeverity = 'solid' | 'subtle' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg' | 'xl'; 

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  severity?: BadgeSeverity; 
  size?: BadgeSize; 
  disabled?: boolean; 
  icon?: React.ReactNode; 
  iconPosition?: 'left' | 'right';
}

export default function Badge({
  children,
  variant = 'neutral',
  severity = 'subtle', 
  size = 'md', 
  disabled = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}: BadgeProps) {
   

  const variantStyles: Record<BadgeVariant, Record<BadgeSeverity, string>> = {
    neutral: {
      solid: 'bg-inverse text-fg-inverse border border-inverse',
      subtle: 'bg-subtle text-fg-muted border border-border',
      outline: 'bg-transparent text-fg border border-border',
    },
    info: {
      solid: 'bg-info text-white border border-info',
      subtle: 'bg-info-subtle text-info-strong border border-info-subtle',
      outline: 'bg-transparent text-info border border-info',
    },
    success: {
      solid: 'bg-success text-white border border-success',
      subtle: 'bg-success-subtle text-success-strong border border-success-subtle',
      outline: 'bg-transparent text-success border border-success',
    },
    warning: {
      solid: 'bg-warning text-white border border-warning',
      subtle: 'bg-warning-subtle text-warning-strong border border-warning-subtle',
      outline: 'bg-transparent text-warning border border-warning',
    },
    error: {
      solid: 'bg-danger text-white border border-danger',
      subtle: 'bg-danger-subtle text-danger-strong border border-danger-subtle',
      outline: 'bg-transparent text-danger border border-danger',
    },
  };

  // 1. Core scale maps using your typography and spacing rules
  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-2 text-sm gap-1',    
    lg: 'px-4.5 py-3 text-base gap-1.5',
    xl: 'px-5 py-4 text-lg gap-2',
  };


  const disabledStyles = 'bg-disabled text-fg-subtle border border-border-disabled opacity-50 pointer-events-none select-none shadow-none';

  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center font-normal leading-none rounded-full select-none transition-colors",
        
        sizeStyles[size],

        disabled ? disabledStyles : variantStyles[variant][severity],

        className
      )}
    >
      {/* Icon Left */}
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 opacity-90 inline-flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* Badge Content */}
      <span className="leading-none">{children}</span>

      {/* Icon Right */}
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 opacity-90 inline-flex items-center justify-center">
          {icon}
        </span>
      )}
    </span>
  );
}