import React from 'react'
import { Theme } from '../../../theme';
import { TbSettings } from 'react-icons/tb';

interface WidgetTitleProps {
    swapTheme: Theme;
    setShowSettings: (value: boolean) => void;
}

const WidgetTitle = ({
    swapTheme,
    setShowSettings
}: WidgetTitleProps) => (
    <div className="flex font-redhat-mono">
        <p style={{
            color: swapTheme.TitleColor
        }} className={`text-2xl font-bold ml-2`}>Swap</p>
        <div className="flex grow" />
        <button
            className={`hover:animate-spin-slow`}
            style={{ color: swapTheme.icons }}
            type="button"
        >
            <TbSettings size={25} onClick={() => {
                setShowSettings(true);
            }} />
        </button>
    </div>
)

export default WidgetTitle;