import { useState } from "react";
import * as React from 'react';
import { MdAccessTime, MdLightbulbOutline } from "react-icons/md";
import ColorPicker from "./ColorPicker";
import Dropdown from "components/dropdown";
import TimeField from 'react-simple-timefield';

  const Room = (props: {
    url: any;
    icon: any;
    name?: string;
    onToggle?: () => void;
    children?: React.ReactNode;
    nightMode?: boolean;
    isTvOn?: boolean;
    tvPosition?: string;
  }) => {
    
    const [color, setColor] = useState("yellow");
    const [dimmer, setDimmer] = useState(0);
    const [classOn, setClassOn] = useState("text-gray-500");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownTimeOpen, setDropdownTimeOpen] = useState(false);

    const handleOnOff = () => {
        const newDimmer = dimmer > 0 ? 0 : 75;
        setDimmer(newDimmer);
        setClassOn(newDimmer > 0 ? "text-brand-500" : "text-gray-500");
        if (props.onToggle) props.onToggle();
    };

    const handleChange = (color: any) => {
        setColor(color.hex);
        setDimmer(75);
        setClassOn("text-brand-500");
    };

    const handleSlider = (value: number) => {
        setDimmer(value);
        if  (value > 0)
            setClassOn("text-brand-500");
        else 
            setClassOn("text-gray-500");
        setDropdownOpen(false);
    };

    const handleTimer = (time: string) => {
        console.log('time', time)
        const timeParts = time.split(':');
        const hours = timeParts[0];
        const minutes = timeParts[1];
        const seconds = timeParts[2];
        const timeoutTotal = (+hours * 3600000) + (+minutes * 60000) + (+seconds * 1000);
        setDropdownTimeOpen(false);
        if (timeoutTotal > 0) {
            setTimeout(function() { 
                setDimmer(70);
                setClassOn("text-brand-500");
            }, timeoutTotal);

            setTimeout(function() { 
                setDimmer(0); 
            }, timeoutTotal + 10000);
        }
    };
    
    const isLightOn = dimmer > 0;
    
    let gradients = [];
    
    if (props.isTvOn) {
      gradients.push(`radial-gradient(circle at ${props.tvPosition || '80% 50%'}, rgba(130, 220, 255, 0.5) 0%, rgba(0,0,0,0) 60%)`);
    }

    if (props.nightMode) {
       if (!isLightOn) {
           gradients.push(`linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85))`);
       } else {
           gradients.push(`linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))`);
       }
    }

    gradients.push(`radial-gradient(circle, ${color} 0%, rgba(70,252,222,0) ${dimmer}%)`);
    gradients.push(`url(${props.url})`);

    const bgImage = gradients.join(', ');

    return (
        <div style={{backgroundImage: bgImage, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', width: '100%', height: '100%', position: 'relative', transition: 'background-image 0.5s ease-in-out' }}>
            {props.children}
            <div className={`flex w-auto h-auto place-items-start`} style={{flexDirection: 'column'}}>
                <div className="ml-2 rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                    <span className={`flex items-center text-xl dark:text-white ${classOn}`} style={{cursor: 'pointer'}} onClick={handleOnOff}>
                        {props.icon}
                    </span>
                    
                </div>
                
                <div className="ml-2">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className={`flex items-center dark:text-white ${classOn}`} style={{cursor: 'pointer'}}>
                            <Dropdown
                                button={
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className={`flex mt-0 items-center text-xl hover:cursor-pointer bg-none text-gray-600 linear justify-center rounded-lg font-bold transition duration-200`}
                                    >
                                    <MdLightbulbOutline/>
                                    </button>
                                }
                                animation={"origin-top-right transition-all duration-300 ease-in-out"}
                                classNames={`{"top-8"} right-0 w-max`}
                                children={
                                    <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" >
                                    <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium" onClick={() => {handleSlider(0)}}>
                                        <span>
                                        <MdLightbulbOutline />
                                        </span>
                                        0%
                                    </p>
                                    <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={() => {handleSlider(25)}}>
                                        <span>
                                        <MdLightbulbOutline />
                                        </span>
                                        25%
                                    </p>
                                    <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={() => {handleSlider(50)}}>
                                        <span>
                                        <MdLightbulbOutline />
                                        </span>
                                        50%
                                    </p>
                                    <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={() => {handleSlider(75)}}>
                                        <span>
                                        <MdLightbulbOutline />
                                        </span>
                                        75%
                                    </p>
                                    <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium" onClick={() => {handleSlider(100)}}>
                                        <span>
                                        <MdLightbulbOutline />
                                        </span>
                                        100%
                                    </p>
                                    </div>
                                }
                            />
                        </span>
                    </div>
                </div>
                
                <div className="ml-2">
                    <div className="rounded-full bg-lightPrimary p-3 w-max dark:bg-navy-700">
                        <span className={`flex items-center w-max dark:text-white ${classOn}`} style={{cursor: 'pointer'}}>
                        <Dropdown
                            button={
                                <button
                                onClick={() => setDropdownTimeOpen(!dropdownTimeOpen)}
                                className={`flex mt-0 items-center text-xl hover:cursor-pointer bg-none text-gray-600 linear justify-center rounded-lg font-bold transition duration-200`}
                                >
                                <MdAccessTime/>
                                </button>
                            }
                            animation={"origin-top-right transition-all duration-300 ease-in-out"}
                            classNames={`{"top-8"} right-0 w-max`}
                            children={
                                <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-md shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none w-[100px]" >
                                    <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium">
                                        <TimeField
                                            value={"00:00"}  
                                            showSeconds
                                            onChange={(event, value) => handleTimer(value)} 
                                            style={{ width: '100px'}}
                                        />
                                    </p>
                                </div>
                            }
                            />
                        </span>
                    </div>
                </div>
                <div className="ml-2">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className={`flex items-center dark:text-white ${classOn}`} style={{cursor: 'pointer'}}>
                            <ColorPicker callBackFunction={handleChange} color={color}></ColorPicker>    
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
