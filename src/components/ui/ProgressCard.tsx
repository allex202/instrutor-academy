import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'amber' | 'emerald' | 'blue' | 'purple' | 'stone' | 'accent';
  className?: string;
  delay?: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon,
  color = 'amber',
  className = '',
  delay = 0
}) => {
  const colorMap = {
    amber: 'from-amber-400 to-amber-600 text-white shadow-amber-500/30',
    emerald: 'from-emerald-400 to-emerald-600 text-white shadow-emerald-500/30',
    blue: 'from-blue-400 to-blue-600 text-white shadow-blue-500/30',
    purple: 'from-purple-400 to-purple-600 text-white shadow-purple-500/30',
    stone: 'from-stone-400 to-stone-600 text-white shadow-stone-500/30',
    accent: 'from-[#ea8562] to-[#cf512a] text-white shadow-[#d4845a]/40'
  };

  const style = delay ? { animationDelay: `${delay}ms` } : {};

  return (
    <div 
      className={`glass dark:glass-dark rounded-xl p-6 card-hover relative overflow-hidden group animate-slide-up opacity-0 ${className}`}
      style={style}
    >
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-white/5 pointer-events-none"></div>
      
      <div className="flex items-center relative z-10">
        <div className={`mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110 ${colorMap[color]}`}>
          <Icon className="h-7 w-7 drop-shadow-sm" />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-stone-500 dark:text-stone-400 uppercase">{title}</h3>
          <p className="mt-1 text-3xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:gradient-text transition-all duration-300">{value}</p>
          {subtitle && (
            <p className="mt-1.5 text-xs font-medium text-stone-500 dark:text-stone-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
