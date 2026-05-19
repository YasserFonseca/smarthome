import React from 'react';
import { MdBolt } from 'react-icons/md';

interface EnergyDashboardProps {
  lights: Record<string, boolean>;
  tvActive: boolean;
  robotActive: boolean;
}

const EnergyDashboard: React.FC<EnergyDashboardProps> = ({ lights, tvActive, robotActive }) => {
  // Energy constants
  const WATT_PER_LIGHT = 15;
  const WATT_TV = 150;
  const WATT_ROBOT = 1200;
  const WATT_BASE = 120; // Refrigerator, router, stand-by

  const activeLights = Object.values(lights).filter(Boolean).length;
  
  const currentConsumption = WATT_BASE 
    + (activeLights * WATT_PER_LIGHT) 
    + (tvActive ? WATT_TV : 0) 
    + (robotActive ? WATT_ROBOT : 0);

  const maxExpected = 1600;
  const percentage = Math.min((currentConsumption / maxExpected) * 100, 100);

  let barColor = 'bg-green-500';
  if (currentConsumption > 600) barColor = 'bg-yellow-500';
  if (currentConsumption > 1000) barColor = 'bg-red-500';

  return (
    <div className="absolute top-[240px] left-6 z-40 w-56 rounded-xl p-3 shadow-2xl backdrop-blur-md bg-white/80 dark:bg-navy-800/80 border border-gray-200 dark:border-navy-600/60">
      <h4 className="font-bold text-navy-700 dark:text-white mb-3 text-[11px] flex items-center gap-1.5 uppercase tracking-wide">
        <MdBolt className="text-yellow-500" size={16} />
        Consumo de Energia
      </h4>
      
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-end">
          <span className="text-2xl font-bold text-navy-700 dark:text-white">
            {currentConsumption} <span className="text-xs text-gray-500">W</span>
          </span>
          <span className="text-xs text-gray-500 mb-1">Atual</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700 overflow-hidden">
          <div className={`${barColor} h-1.5 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${percentage}%` }}></div>
        </div>
        
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>Base: {WATT_BASE}W</span>
          <span>Max: {maxExpected}W</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
