import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'gray' | 'clinical';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', className, ...props }) => {
  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
    gray: "bg-slate-500/10 text-slate-300 border border-slate-500/20",
    clinical: "bg-clinical-blue/10 text-clinical-blueHover border border-clinical-blue/20",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
