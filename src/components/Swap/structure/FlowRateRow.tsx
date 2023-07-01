import React from "react";
import styled from "styled-components";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { TokenOption } from "../../../types/TokenOption";
import { defaultTheme } from "../../../theme/theme";
import { Theme } from "../../../theme";
import { ExplicitAny } from "../../../types/ExplicitAny";
import { useStore } from "../../../store";

interface FlowRateRowProps {
    options: GenericDropdownOption[] | TokenOption[];
    theme: Theme;
    setFlowRateDropDown: (value: boolean) => void;
}

const Container = styled.div<{ theme: ExplicitAny }>`
    display: flex;
    overflow: auto;
    padding-top: 10px;
    padding-bottom: 16px;
    padding-left: 14px;
    padding-right: 8px;
    margin-top: 8px;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 0px 0px ${({ theme }) => theme.secondaryBorderRadius}
        ${({ theme }) => theme.secondaryBorderRadius};

    &::-webkit-scrollbar {
        width: 0.5rem;
        background-color: transparent;
    }

    /* Hide scrollbar thumb on hover */
    &::-webkit-scrollbar-thumb:hover {
        background-color: transparent;
    }

    /* Hide scrollbar thumb when inactive */
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    /* Hide scrollbar track */
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

const FlowRateRow = ({
    options,
    theme,
    setFlowRateDropDown,
}: FlowRateRowProps) => {
    const { setFlowrateUnit } = useStore();
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <Container
            theme={swapTheme}
            style={{
                backgroundColor: swapTheme.streamLengthBox,
            }}
        >
            {options.map((option) => (
                <button
                    type="button"
                    className="w-full px-3 py-3 flex items-center justify-center mt-3 text-lg cursor-pointer"
                    key={option.value}
                    onClick={() => {
                        setFlowrateUnit(option);
                        setFlowRateDropDown(false);
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
                </button>
            ))}
        </Container>
    );
};

export default FlowRateRow;
