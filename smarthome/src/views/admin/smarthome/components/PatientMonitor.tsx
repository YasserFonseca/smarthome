import React, { useState, useEffect } from 'react';
import { MdDirectionsWalk, MdFavorite, MdBatteryFull } from 'react-icons/md';

interface PatientMonitorProps {
  locationName: string;
  positionClass?: string;
}

const PatientMonitor: React.FC<PatientMonitorProps> = ({ locationName, positionClass = "top-[60%] left-1/2" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bpm, setBpm] = useState(75);

  // Simulate heartbeat variations
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-50 ${positionClass}`}>
      {/* Patient Avatar/Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center p-3 rounded-full shadow-lg bg-white text-blue-500 hover:scale-110 transition-transform duration-200 dark:bg-navy-800"
      >
        <MdDirectionsWalk size={24} />
        {/* Pulse indicator */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>

      {/* Popover Stats */}
      {isOpen && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white dark:bg-navy-700 p-4 rounded-xl shadow-2xl w-52 border border-gray-100 dark:border-navy-600">
          <h4 className="font-bold text-navy-700 dark:text-white mb-1 border-b pb-2 dark:border-navy-500">Smart Band</h4>
          
          <div className="flex flex-col gap-2 mt-3 text-sm">
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1"><MdFavorite className="text-red-500 animate-pulse" /> BPM</span>
              <span className="font-bold text-navy-700 dark:text-white">{bpm}</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1"><MdBatteryFull className="text-green-500" /> Bateria</span>
              <span className="font-bold text-navy-700 dark:text-white">84%</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">📍 Local</span>
              <span className="font-bold text-navy-700 dark:text-white">{locationName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PatientMonitor);
