import React from 'react';
import { ArrowDown } from 'lucide-react';

interface DiagramStep {
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface DiagramProps {
  steps: DiagramStep[];
}

const Diagram: React.FC<DiagramProps> = ({ steps }) => {
  return (
    <div className="flex flex-col items-center py-6">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-sm" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
            <div className="card relative p-4 text-center">
              {step.icon && (
                <div className="mb-2 flex justify-center text-amber-600 dark:text-amber-500">
                  {step.icon}
                </div>
              )}
              <h4 className="font-semibold text-stone-900 dark:text-white">{step.label}</h4>
              {step.description && (
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {step.description}
                </p>
              )}
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="animate-in fade-in duration-500 my-2 flex h-8 items-center justify-center text-stone-400 dark:text-stone-500" style={{ animationDelay: `${(index * 150) + 75}ms`, animationFillMode: 'both' }}>
              <ArrowDown className="h-5 w-5" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Diagram;
