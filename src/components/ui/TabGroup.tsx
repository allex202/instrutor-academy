import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-1 rounded-xl bg-stone-100 p-1 dark:bg-neutral-800">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 outline-none
              ${isActive 
                ? 'bg-white text-stone-900 shadow dark:bg-neutral-700 dark:text-white' 
                : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300'
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabGroup;
