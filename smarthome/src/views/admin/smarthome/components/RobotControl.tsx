import React, { useState, useEffect } from 'react';
import { MdCleaningServices, MdPlayArrow, MdStop } from 'react-icons/md';

interface RobotControlProps {
  addLog: (msg: string) => void;
  onActiveChange?: (active: boolean) => void;
  positionClass?: string;
}

const RobotControl: React.FC<RobotControlProps> = ({ addLog, onActiveChange, positionClass = "top-1/2 left-1/2" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'ocioso' | 'lavando' | 'concluido'>('ocioso');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'lavando') {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setStatus('concluido');
            addLog('Robô Lava-louças: Ciclo concluído.');
            if (onActiveChange) onActiveChange(false);
            return 100;
          }
          return p + 10;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, addLog]);

  const handleStart = () => {
    setStatus('lavando');
    setProgress(0);
    addLog('Robô Lava-louças: Ciclo iniciado.');
    if (onActiveChange) onActiveChange(true);
  };

  const handleStop = () => {
    setStatus('ocioso');
    setProgress(0);
    addLog('Robô Lava-louças: Ciclo parado pelo usuário.');
    if (onActiveChange) onActiveChange(false);
  };

  return (
    <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-50 ${positionClass}`}>
      {/* Robot Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 ${status === 'lavando' ? 'bg-brand-500 text-white animate-pulse' : 'bg-white text-brand-500 dark:bg-navy-800'}`}
      >
        <MdCleaningServices size={24} />
      </button>

      {/* Popover Control */}
      {isOpen && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white dark:bg-navy-700 p-4 rounded-xl shadow-2xl w-48 text-center border border-gray-100 dark:border-navy-600">
          <h4 className="font-bold text-navy-700 dark:text-white mb-2">Robô Lava-louças</h4>
          <p className="text-sm text-gray-500 mb-3 capitalize">{status}</p>
          
          {status === 'lavando' && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="flex justify-center gap-2">
            {status !== 'lavando' ? (
              <button onClick={handleStart} className="flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                <MdPlayArrow /> Iniciar
              </button>
            ) : (
              <button onClick={handleStop} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                <MdStop /> Parar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(RobotControl);
