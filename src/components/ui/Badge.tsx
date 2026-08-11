import React from 'react';

type BadgeVariant = 'accent' | 'success' | 'warning' | 'error' | 'neutral' | 'primary';

interface BadgeProps {
  variant?: BadgeVariant | string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'neutral', 
  children,
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-semibold tracking-wide border shadow-sm backdrop-blur-sm transition-all';
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[10px] uppercase' : 'px-3 py-1 text-xs';
  
  const variantClasses: Record<string, string> = {
    primary: 'bg-amber-100/90 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800/50',
    accent: 'bg-[#fdf5f1]/90 text-[#ad3d1c] border-[#fbe6dd] dark:bg-[#742e18]/40 dark:text-[#f7cebe] dark:border-[#8c341a]/50 animate-pulse-glow',
    success: 'bg-emerald-100/90 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50',
    warning: 'bg-yellow-100/90 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-800/50',
    error: 'bg-red-100/90 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800/50',
    neutral: 'bg-white/80 text-stone-700 border-stone-200 dark:bg-neutral-800/80 dark:text-stone-300 dark:border-neutral-700/60'
  };

  const appliedVariant = variantClasses[variant as string] || variantClasses.neutral;

  return (
    <span className={`${baseClasses} ${sizeClasses} ${appliedVariant} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
