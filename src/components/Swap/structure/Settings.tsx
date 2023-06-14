import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io'
import SettingsOption from "./SettingsOption";

interface SettingsProps {
    theme?: Theme;
    display: boolean;
    setDisplay: (value: boolean) => void;
    autoWrap: boolean;
    setAutoWrap: (value: boolean) => void;
    importTokens: boolean;
    setImportTokens: (value: boolean) => void;
    schedule: boolean;
    setSchedule: (value: boolean) => void;
}

const Settings = ({
    display,
    theme,
    setDisplay,
    autoWrap,
    setAutoWrap,
    importTokens,
    setImportTokens,
    schedule,
    setSchedule }: SettingsProps) => {

    const [isExitHover, setIsExitHover] = useState(false);

    const options = [
        { title: 'Auto Wrap', state: autoWrap, setState: setAutoWrap },
        { title: 'Import Super Tokens', state: importTokens, setState: setImportTokens },
        { title: 'Schedule Swap', state: schedule, setState: setSchedule },
    ]

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <div className={`${display ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out duration-300 rounded-[2rem] bg-transparent px-4`}
            style={{
                scrollbarWidth: 'none'
            }}
        >
            <div className="w-full flex items-start justify-end px-4 py-1">
                <IoMdClose className="text-3xl cursor-pointer ease-in-out duration-100"
                    onMouseEnter={() => {
                        setIsExitHover(true)
                    }}
                    onMouseLeave={() => {
                        setIsExitHover(false)
                    }}
                    style={{ color: isExitHover ? swapTheme.accentText : swapTheme.primaryText }}
                    onClick={() => {
                        setDisplay(false)
                    }}
                />
            </div>
            <div className="w-full bg-transparent space-y-0">
                {options.map((option, index) => (
                    <SettingsOption
                        item={option}
                        index={index}
                        swapTheme={swapTheme}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Settings;