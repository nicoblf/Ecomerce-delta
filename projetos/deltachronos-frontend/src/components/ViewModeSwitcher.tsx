"use client";

import { LayoutGrid } from 'lucide-react';

interface ViewModeSwitcherProps {
  onViewChange: (cols: number) => void;
  currentCols: number;
}

export function ViewModeSwitcher({ onViewChange, currentCols }: ViewModeSwitcherProps) {
  const viewOptions = [3, 4];

  return (
    <div className="flex items-center gap-2">
      {viewOptions.map(cols => (
        <button
          key={cols}
          onClick={() => onViewChange(cols)}
          aria-label={`Visualizar em ${cols} colunas`}
          className={`p-2 rounded-md transition-colors ${
            currentCols === cols
              ? 'bg-cyan-500 text-white'
              : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600'
          }`}
        >
          <LayoutGrid size={20} />
        </button>
      ))}
    </div>
  );
}