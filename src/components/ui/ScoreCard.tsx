import React, { useEffect, useState } from 'react';

interface ScoreCardProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, label, size = 'md' }) => {
  const [currentScore, setCurrentScore] = useState(0);
  
  useEffect(() => {
    // Simple animation effect
    const timeout = setTimeout(() => {
      setCurrentScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const getColor = (val: number) => {
    if (val < 50) return 'text-red-500 stroke-red-500';
    if (val < 70) return 'text-amber-500 stroke-amber-500';
    return 'text-emerald-500 stroke-emerald-500';
  };

  const dimensions = {
    sm: { width: 64, strokeWidth: 4, text: 'text-sm' },
    md: { width: 96, strokeWidth: 6, text: 'text-xl' },
    lg: { width: 128, strokeWidth: 8, text: 'text-3xl' }
  };

  const { width, strokeWidth, text } = dimensions[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;
  const colorClass = getColor(currentScore);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width, height: width }}>
        {/* Background Circle */}
        <svg className="absolute inset-0 -rotate-90 transform" width={width} height={width}>
          <circle
            className="stroke-stone-200 dark:stroke-neutral-700"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={width / 2}
            cy={width / 2}
          />
          {/* Progress Circle */}
          <circle
            className={`transition-all duration-1000 ease-out ${colorClass.split(' ')[1]}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={width / 2}
            cy={width / 2}
          />
        </svg>
        <div className={`absolute flex items-center justify-center font-bold ${colorClass.split(' ')[0]} ${text}`}>
          {currentScore}
        </div>
      </div>
      <div className="mt-3 text-center text-sm font-medium text-stone-600 dark:text-stone-300">
        {label}
      </div>
    </div>
  );
};

export default ScoreCard;
