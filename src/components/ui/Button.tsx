import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, className, ...props }, ref) => {
    
    const variants = {
      primary: "bg-clinical-blue text-white shadow-lg shadow-clinical-blue/20 hover:bg-clinical-blueHover hover:shadow-clinical-blue/40 border border-transparent",
      outline: "bg-transparent text-clinical-blue border border-clinical-blue/50 hover:bg-clinical-blue/10 hover:border-clinical-blue",
      danger: "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50",
      ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-clinical-blue/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
