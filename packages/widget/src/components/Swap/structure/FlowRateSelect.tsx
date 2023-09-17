import React from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { TokenOption } from "../../../types/TokenOption";
import { defaultTheme } from "../../../theme/theme";
import { Theme } from "../../../theme";

interface SelectProps {
    dropdownValue: GenericDropdownOption | TokenOption;
    theme?: Theme;
}

const FlowRateSelect = ({
    dropdownValue,
    theme
}: SelectProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <div className="w-full flex flex-row py-3 items-center justify-center"
            style={{
                backgroundColor: swapTheme.streamLengthBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                fontFamily: swapTheme.textFont,
                fontWeight: swapTheme.accentFontWeight,
            }}
        >
            <h1 className="text-xl opacity-75"
                style={{
                    color: swapTheme.TitleColor
                }}>{dropdownValue.label}
            </h1>
        </div>
    );
};

export default FlowRateSelect;
