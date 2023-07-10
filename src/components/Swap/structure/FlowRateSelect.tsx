import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { defaultTheme } from "../../../theme/theme";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface SelectProps {
    theme: Theme;
    setFlowRateDropDown: (value: boolean) => void;
    flowRateDropDown: boolean;
}

const FlowRateSelect = ({
    theme,
    setFlowRateDropDown,
    flowRateDropDown,
}: SelectProps) => {
    const { flowrateUnit } = useStore();
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <button
            type="button"
            className="w-full flex flex-row py-3 cursor-pointer"
            style={{
                backgroundColor: swapTheme.streamLengthBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                fontFamily: swapTheme.textFont,
                fontWeight: swapTheme.accentFontWeight,
            }}
            onClick={() => {
                setFlowRateDropDown(!flowRateDropDown);
            }}
        >
            <div
                className="w-[90%] flex justify-center items-center"
                style={{
                    borderRadius: swapTheme.accentBorderRadius,
                    fontWeight: swapTheme.accentFontWeight,
                }}
            >
                <h1
                    className="text-xl ml-9 opacity-75"
                    style={{
                        color: swapTheme.TitleColor,
                    }}
                >
                    {flowrateUnit.label}
                </h1>
            </div>
            <div
                className="flex items-center justify-center w-[10%] -ml-2"
                style={{
                    borderRadius: swapTheme.accentBorderRadius,
                }}
            >
                <HiChevronDown
                    className={`${
                        flowRateDropDown ? "-rotate-180" : ""
                    } h-6 w-6 flex flex-shrink-0 ease-in-out opacity-75`}
                    style={{
                        color: swapTheme.TitleColor,
                        transitionDuration: swapTheme.primaryDuration,
                    }}
                />
            </div>
        </button>
    );
};

export default FlowRateSelect;
