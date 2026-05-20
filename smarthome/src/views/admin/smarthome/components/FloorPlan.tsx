import Card from "components/card";
import { MdBathroom, MdBedroomChild, MdBedroomParent, MdKitchen, MdLight, MdLiving } from "react-icons/md";
import livingRoom from "assets/img/livingroom.png";
import bedRoom from "assets/img/bedroom.png";
import bedRoom2 from "assets/img/bedroom2.png";
import kitchen from "assets/img/kitchen.png";
import bath from "assets/img/bath.png";
import Room from "./Room";
import RobotControl from "./RobotControl";
import PatientMonitor from "./PatientMonitor";
import ActivityLog from "./ActivityLog";
import EnergyDashboard from "./EnergyDashboard";
import { MdLock, MdLockOpen } from "react-icons/md";
import { useState, useEffect, useRef, useMemo } from "react";
import React from 'react';

const FloorPlan = (props: any) => {
  const { lights, onToggleLight, mainDoorLocked, onToggleLock, logs, addLog } = props;

  const [patientRoom, setPatientRoom] = useState('bedRoom2');
  const [nightMode, setNightMode] = useState(false);
  const [robotActive, setRobotActive] = useState(false);
  const prevRoomRef = useRef<string>('bedRoom2');

  useEffect(() => {
    if (patientRoom === 'livingRoom' && prevRoomRef.current !== 'livingRoom') {
      addLog('TV da sala ligada automaticamente.');
    } else if (patientRoom !== 'livingRoom' && prevRoomRef.current === 'livingRoom') {
      addLog('TV da sala desligada.');
    }
    prevRoomRef.current = patientRoom;
  }, [patientRoom, addLog]);

  useEffect(() => {
    const rooms = ['kitchen', 'bath', 'bedRoom', 'livingRoom', 'bedRoom2'];
    const interval = setInterval(() => {
      setPatientRoom(prev => {
        let nextRoom;
        do {
          nextRoom = rooms[Math.floor(Math.random() * rooms.length)];
        } while (nextRoom === prev);
        return nextRoom;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getRoomName = (room: string) => {
    switch(room) {
      case 'kitchen': return 'Cozinha';
      case 'bath': return 'Banheiro';
      case 'bedRoom': return 'Quarto 1';
      case 'livingRoom': return 'Sala';
      case 'bedRoom2': return 'Quarto Principal';
      default: return '';
    }
  };

  const handleToggleNightMode = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    addLog(newMode ? 'Modo Noturno ativado.' : 'Modo Noturno desativado.');
  };

  return (
    <Card extra={`flex flex-col w-full h-fit rounded-3xl py-6 px-2 text-center transition-colors duration-500 ${nightMode ? 'bg-navy-900' : 'bg-white'}`}>
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Controles
        </h2>
        <button 
          onClick={handleToggleNightMode}
          className={`!linear z-[1] flex items-center justify-center rounded-lg p-2 px-4 shadow-sm !transition !duration-200 ${nightMode ? 'bg-white text-navy-900' : 'bg-navy-800 text-white'}`}
        >
          <span className="text-sm font-bold tracking-wide">{nightMode ? '🌞 Modo Dia' : '🌙 Modo Noite'}</span>
        </button>
      </div>

      <ActivityLog logs={logs} />
      <EnergyDashboard lights={lights} tvActive={patientRoom === 'livingRoom'} robotActive={robotActive} />
      
      <div style={{
        position: 'relative',
        display: 'grid',
        aspectRatio: '1016 / 692',
        gridTemplateRows: '356fr 336fr',
        marginTop: '20px',
        margin: '20px auto',
        width: '100%',
        maxWidth: '850px'
      }}>
        <div style={{display: 'grid', gridTemplateColumns: '397fr 172fr 447fr'}}>
          <Room url={kitchen} icon={<MdKitchen></MdKitchen>} onToggle={() => onToggleLight('kitchen', 'Cozinha')} nightMode={nightMode}>
            <RobotControl addLog={addLog} onActiveChange={setRobotActive} positionClass="top-[40%] left-[75%]" />
            {patientRoom === 'kitchen' && <PatientMonitor locationName={getRoomName('kitchen')} positionClass="top-[20%] left-[40%]" />}
          </Room>
          <Room url={bath} icon={<MdBathroom></MdBathroom>} onToggle={() => onToggleLight('bath', 'Banheiro')} nightMode={nightMode}>
            {patientRoom === 'bath' && <PatientMonitor locationName={getRoomName('bath')} positionClass="top-[50%] left-[70%]" />}
          </Room>
          <Room url={bedRoom} icon={<MdBedroomChild></MdBedroomChild>} onToggle={() => onToggleLight('bedRoom', 'Quarto 1')} nightMode={nightMode}>
            {patientRoom === 'bedRoom' && <PatientMonitor locationName={getRoomName('bedRoom')} positionClass="top-[70%] left-[30%]" />}
          </Room>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '570fr 446fr'}}>
          <Room url={livingRoom} icon={<MdLiving></MdLiving>} onToggle={() => onToggleLight('livingRoom', 'Sala')} nightMode={nightMode} isTvOn={patientRoom === 'livingRoom'} tvPosition="63% 0%">
            <button 
              onClick={onToggleLock}
              className={`absolute bottom-[10%] left-[20%] p-3 rounded-full shadow-lg transition-all duration-300 ${mainDoorLocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            >
              {mainDoorLocked ? <MdLock size={20} /> : <MdLockOpen size={20} />}
            </button>
            {patientRoom === 'livingRoom' && <PatientMonitor locationName={getRoomName('livingRoom')} positionClass="top-[50%] left-[70%]" />}
          </Room>
          <Room url={bedRoom2} icon={<MdBedroomParent></MdBedroomParent>} onToggle={() => onToggleLight('bedRoom2', 'Quarto Principal')} nightMode={nightMode}>
            {patientRoom === 'bedRoom2' && <PatientMonitor locationName={getRoomName('bedRoom2')} positionClass="top-[40%] left-[40%]" />}
          </Room>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(FloorPlan);
