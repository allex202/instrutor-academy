import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  size = 'md', 
  color,
  label,
  showPercentage = false
}) => {
  const percentage = Math.min(100, Math.max(0, value));
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(percentage), 150);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const fillClass = color || 'bg-gradient-to-r from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)]';

  return (
    <div className="w-full animate-fade-in">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          {label && <span className="text-stone-700 dark:text-stone-300">{label}</span>}
          {showPercentage && <span className="text-amber-600 dark:text-amber-400 font-bold tracking-tight">{percentage}%</span>}
        </div>
      )}
      <div className={`relative w-full overflow-hidden rounded-full bg-stone-200/60 dark:bg-neutral-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] ${sizeClasses[size]}`}>
        <div 
          className={`relative h-full rounded-full transition-all duration-1000 ease-out overflow-hidden ${fillClass}`}
          style={{ width: `${animatedWidth}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
