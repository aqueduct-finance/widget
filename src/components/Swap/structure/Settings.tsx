import { Theme } from "../../../theme";
import { defaultTheme } from "../../../theme/theme";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SettingsOption from "./SettingsOption";
import { AiOutlinePoweroff } from "react-icons/ai";
import { disconnect } from "@wagmi/core";

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
    setSchedule,
}: SettingsProps) => {
    const [isExitHover, setIsExitHover] = useState(false);
    const [isPower, setIsPower] = useState(false);

    const options = [
        { title: "Auto Wrap", state: autoWrap, setState: setAutoWrap },
        { title: "Schedule Swap", state: schedule, setState: setSchedule },
    ];

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const disconnectWallet = async () => {
        await disconnect();
        setDisplay(false);
    };

    return (
        <div
            className={`${
                display ? " flex" : "hidden"
            } flex-col w-full h-full items-start justify-start ease-in-out px-4`}
            style={{
                scrollbarWidth: "none",
                transitionDuration: swapTheme.primaryDuration,
                borderRadius: swapTheme.secondaryBorderRadius,
                backgroundColor: "transparent",
            }}
        >
            <div className="w-full flex items-center justify-between px-4 py-1">
                <AiOutlinePoweroff
                    className="text-2xl cursor-pointer ease-in-out"
                    onMouseEnter={() => {
                        setIsPower(true);
                    }}
                    onMouseLeave={() => {
                        setIsPower(false);
                    }}
                    style={{
                        color: isPower ? swapTheme.accentText : swapTheme.icons,
                        transitionDuration: swapTheme.secondaryDuration,
                    }}
                    onClick={disconnectWallet}
                />
                <IoMdClose
                    className="text-3xl cursor-pointer ease-in-out"
                    onMouseEnter={() => {
                        setIsExitHover(true);
                    }}
                    onMouseLeave={() => {
                        setIsExitHover(false);
                    }}
                    style={{
                        color: isExitHover
                            ? swapTheme.accentText
                            : swapTheme.icons,
                        transitionDuration: swapTheme.secondaryDuration,
                    }}
                    onClick={() => {
                        setDisplay(false);
                    }}
                />
            </div>
            <div
                className="w-full space-y-0"
                style={{
                    backgroundColor: "transparent",
                }}
            >
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
    );
};

export default Settings;
