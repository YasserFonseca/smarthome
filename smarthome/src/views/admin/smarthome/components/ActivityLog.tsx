import React from 'react';
import { ActivityLogItem } from '../index';

interface ActivityLogProps {
  logs: ActivityLogItem[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="absolute top-16 left-6 z-40 w-56 max-h-40 overflow-y-auto rounded-xl p-3 shadow-2xl backdrop-blur-md bg-white/80 dark:bg-navy-800/80 border border-gray-200 dark:border-navy-600/60">
      <h4 className="font-bold text-navy-700 dark:text-white mb-2 text-[11px] flex items-center gap-1.5 uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Atividades Recentes
      </h4>
      
      <div className="flex flex-col gap-2">
        {logs.length === 0 ? (
          <p className="text-[10px] text-gray-500 dark:text-gray-400 italic">Nenhuma atividade registrada.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="text-[10px] flex items-start gap-1.5 bg-white/50 dark:bg-navy-900/50 p-1.5 rounded-lg">
              <span className="font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{log.time}</span>
              <span className="text-navy-700 dark:text-white leading-tight">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(ActivityLog);
