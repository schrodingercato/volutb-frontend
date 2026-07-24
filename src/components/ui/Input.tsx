import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(7);
    
    return (
      <div className={cn("mb-4", className)}>
        {label && (
          <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-lg bg-charcoal-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors",
            "focus:border-clinical-blue focus:outline-none focus:ring-1 focus:ring-clinical-blue",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          {...props}
        />
        {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
