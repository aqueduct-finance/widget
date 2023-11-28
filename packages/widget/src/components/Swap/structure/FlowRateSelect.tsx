import React from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { defaultTheme } from "../../../theme/theme";
import { Theme } from "../../../theme";

interface SelectProps {
    dropdownValue: GenericDropdownOption;
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
            <h1 className="text-xl"
                style={{
                    color: swapTheme.secondaryText
                }}>{dropdownValue.label}
            </h1>
        </div>
    );
};

export default FlowRateSelect;
