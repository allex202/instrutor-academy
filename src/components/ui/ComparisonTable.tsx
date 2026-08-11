import React, { useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export interface Column {
  key: string;
  header: string;
  sortable?: boolean;
}

interface ComparisonTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  highlightColumn?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ columns, rows, highlightColumn }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig) return rows;

    return [...rows].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      const safeA = aVal ?? '';
      const safeB = bVal ?? '';
      // Fallback for non-string values
      if (safeA < safeB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (safeA > safeB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-stone-50 text-stone-700 dark:bg-neutral-900/50 dark:text-stone-300">
          <tr>
            {columns.map((col, idx) => (
              <th 
                key={col.key} 
                className={`px-4 py-3 font-semibold ${col.key === highlightColumn ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''} ${idx === 0 ? 'rounded-tl-xl' : ''} ${idx === columns.length - 1 ? 'rounded-tr-xl' : ''}`}
              >
                {col.sortable ? (
                  <button
                    className="flex w-full items-center gap-1 hover:text-stone-900 dark:hover:text-white"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    {sortConfig?.key === col.key ? (
                      sortConfig.direction === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUpDown className="h-3.5 w-3.5 opacity-30" />
                    )}
                  </button>
                ) : (
                  <span>{col.header}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 dark:divide-neutral-700">
          {sortedRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors hover:bg-stone-50/50 dark:hover:bg-neutral-700/30">
              {columns.map((col) => (
                <td 
                  key={`${rowIndex}-${col.key}`} 
                  className={`px-4 py-3 ${col.key === highlightColumn ? 'bg-amber-50/30 font-medium text-amber-900 dark:bg-amber-900/10 dark:text-amber-100' : 'text-stone-600 dark:text-stone-300'}`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
