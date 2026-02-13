
import React from 'react';
import { UserStats, Translations } from '../types';

interface StatsBoardProps {
  stats: UserStats;
  t: Translations;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ stats, t }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-full transition-colors">
        <span className="text-sm">✅</span>
        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{stats.correctCount}</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800 rounded-full transition-colors">
        <span className="text-sm">🔥</span>
        <span className="text-xs font-bold text-orange-700 dark:text-orange-400">{stats.streak}</span>
      </div>
    </div>
  );
};

export default StatsBoard;
