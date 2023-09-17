import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React from 'react'
import { useContextDays } from '@rehookify/datepicker';

interface DateTimeSelectButtonProps {
    theme?: Theme;
}

const DateTimeSelectButton = ({ theme }: DateTimeSelectButtonProps) => {

    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const { formattedDates } = useContextDays();

    return (
        <div
            className="w-full flex items-center space-x-2 px-5 py-3"
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius,
            }}
        >
            <p
                style={{
                    color: swapTheme.accentText,
                    fontWeight: swapTheme.accentFontWeight,
                    fontFamily: swapTheme.textFont,
                }}
                className="flex grow text-sm opacity-75"
            >
                End date/time:
            </p>
            <p
                style={{
                    color: swapTheme.accentText,
                    fontWeight: swapTheme.accentFontWeight,
                    fontFamily: swapTheme.textFont,
                }}
                className="text-sm"
            >
                {formattedDates && formattedDates[0] && formattedDates[0].toString()}
            </p>
        </div>
    );
};

export default DateTimeSelectButton;
