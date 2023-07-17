import React from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { TokenOption } from "../../../types/TokenOption";
import { defaultTheme } from "../../../theme/theme";
import { Theme } from "../../../theme";
import styled from "styled-components";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";

interface FlowRateRowProps {
    options: GenericDropdownOption[] | TokenOption[];
    setDropdownValue:
        | ((value: GenericDropdownOption) => void)
        | ((token: TokenOption) => void);
    theme?: Theme;
}

const FlowRateRow = ({
    options,
    setDropdownValue,
    theme
}: FlowRateRowProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const store = useStore();

    return (
        <div
            //theme={swapTheme}
            //className="p-2"
            style={{
                //backgroundColor: swapTheme.streamLengthBox,
                borderRadius: swapTheme.secondaryBorderRadius,
            }}
        >
            {options.map((option) => (
                <div className="w-full px-3 py-3 flex items-center justify-center mt-3 text-lg cursor-pointer"
                    key={option.sublabel}
                    onClick={() => {
                        setDropdownValue(option)
                        store.setCollapseState(CollapseState.NONE)
                    }}
                    style={{
                        backgroundColor: swapTheme.useMaxButton,
                        color: swapTheme.primaryText,
                        borderRadius: swapTheme.accentBorderRadius,
                        fontWeight: swapTheme.accentFontWeight,
                        fontFamily: swapTheme.textFont,
                    }}
                >
                    <h1 className="opacity-75">{option.label}</h1>
                </div>
            ))}
        </div>
    )
}

export default FlowRateRow;
