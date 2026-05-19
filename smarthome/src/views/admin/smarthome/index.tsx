import FloorPlan from "views/admin/smarthome/components/FloorPlan";
import { useEffect, useState } from "react";

export interface ActivityLogItem {
  id: number;
  time: string;
  message: string;
}

const SmartHome = () => {
  const [lights, setLights] = useState({
    kitchen: false,
    bath: false,
    bedRoom: false,
    livingRoom: false,
    bedRoom2: false,
  });

  const [mainDoorLocked, setMainDoorLocked] = useState(true);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);

  const addLog = (message: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLogs(prev => [{ id: Date.now(), time: timeStr, message }, ...prev].slice(0, 10)); // Keep last 10
  };

  const toggleLight = (room: keyof typeof lights, roomName: string) => {
    setLights(prev => {
      const newState = !prev[room];
      addLog(`Luz da ${roomName} ${newState ? 'ligada' : 'desligada'}.`);
      return { ...prev, [room]: newState };
    });
  };

  const toggleLock = () => {
    setMainDoorLocked(prev => {
      const newState = !prev;
      addLog(`Porta Principal ${newState ? 'trancada' : 'destrancada'}.`);
      return newState;
    });
  };

  return (
    <div className="mt-3 grid h-fit ">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <FloorPlan 
          lights={lights}
          onToggleLight={toggleLight}
          mainDoorLocked={mainDoorLocked}
          onToggleLock={toggleLock}
          logs={logs}
          addLog={addLog}
        />
      </div>

      { /* right side */ }
      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        
      </div> */}
    </div>
  );
};

export default SmartHome;
