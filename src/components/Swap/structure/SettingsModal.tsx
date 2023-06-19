import Settings from "./Settings"
import { Theme } from "../../../theme";
import React from "react";

interface SettingsModalProviderProps {
    theme?: Theme;
    showSettings: boolean;
    setShowSettings: (value: boolean) => void;
    autoWrap: boolean;
    setAutoWrap: (value: boolean) => void;
    schedule: boolean;
    setSchedule: (value: boolean) => void;
}

const SettingsModalProvider = ({
    theme,
    showSettings,
    setShowSettings,
    autoWrap,
    setAutoWrap,
    schedule,
    setSchedule
}: SettingsModalProviderProps) => (
    <div
        className={`absolute bottom-[0.2rem] left-0 right-0 z-50 bg-black transition-all rounded-[2rem] duration-300 ${showSettings
            ? "top-0 pointer-events-auto"
            : "top-full pointer-events-none"
            }`}
    >
        <Settings
            display={showSettings}
            setDisplay={setShowSettings}
            theme={theme}
            autoWrap={autoWrap}
            setAutoWrap={setAutoWrap}
            schedule={schedule}
            setSchedule={setSchedule}
        />
    </div>
)

export default SettingsModalProvider;