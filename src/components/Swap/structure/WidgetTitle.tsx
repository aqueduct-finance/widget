import React from "react";
import { TbSettings } from "react-icons/tb";
import { Theme } from "../../../theme";

interface WidgetTitleProps {
    swapTheme: Theme;
    setShowSettings: (value: boolean) => void;
}

const WidgetTitle = ({ swapTheme, setShowSettings }: WidgetTitleProps) => (
    <div className="flex">
        <p
            style={{
                color: swapTheme.TitleColor,
                fontWeight: swapTheme.primaryFontWeight,
            }}
            className="text-2xl ml-2"
        >
            Swap
        </p>
        <div className="flex grow" />
        <button
            className="hover:animate-spin-slow"
            style={{ color: swapTheme.icons }}
            type="button"
        >
            <TbSettings
                size={25}
                onClick={() => {
                    setShowSettings(true);
                }}
            />
        </button>
    </div>
);

export default WidgetTitle;
