import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io'
import SettingsOption from "./SettingsOption";
import { AiOutlinePoweroff } from "react-icons/ai"
import { disconnect } from "@wagmi/core"

interface SettingsProps {
    theme?: Theme;
    display: boolean;
    setDisplay: (value: boolean) => void;
    autoWrap: boolean;
    setAutoWrap: (value: boolean) => void;
    schedule: boolean;
    setSchedule: (value: boolean) => void;
}

const Settings = ({
    display,
    theme,
    setDisplay,
    autoWrap,
    setAutoWrap,
    schedule,
    setSchedule }: SettingsProps) => {

    const [isExitHover, setIsExitHover] = useState(false);
    const [isPower, setIsPower] = useState(false)

    const options = [
        { title: 'Auto Wrap', state: autoWrap, setState: setAutoWrap },
        { title: 'Schedule Swap', state: schedule, setState: setSchedule },
    ]

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const disconnectWallet = async () => {
        await disconnect();
        setDisplay(false)
    }

    return (
        <div className={`${display ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out duration-300 rounded-[2rem] bg-transparent px-4`}
            style={{
                scrollbarWidth: 'none'
            }}
        >
            <div className="w-full flex items-center justify-between px-4 py-1">
                <AiOutlinePoweroff className="text-2xl cursor-pointer ease-in-out duration-100"
                    onMouseEnter={() => {
                        setIsPower(true)
                    }}
                    onMouseLeave={() => {
                        setIsPower(false)
                    }}
                    style={{ color: isPower ? swapTheme.accentText : swapTheme.primaryText }}
                    onClick={disconnectWallet}
                />
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