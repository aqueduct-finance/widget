import React from "react";
import { HiArrowDown } from "react-icons/hi";
import { Theme } from "../../../theme";

interface ActivateSwapArrowProps {
    swapTheme: Theme;
    overBalance: boolean;
    isEntered: boolean;
    setSwapActive: (value: boolean) => void;
}

const ActivateSwapArrow = ({
    swapTheme,
    overBalance,
    isEntered,
    setSwapActive
}: ActivateSwapArrowProps) => (
    <div className="flex w-full items-center justify-center -mt-3">
        <div className="px-2 py-2 z-10 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={() => {
                if (!overBalance && isEntered) {
                    setSwapActive(true)
                }
            }}
            style={{
                backgroundColor: swapTheme.useMaxButton,
                borderRadius: swapTheme.accentBorderRadius
            }}
        >
            <HiArrowDown className="text-xl"
                style={{
                    color: swapTheme.accentText
                }}
            />
        </div>
    </div>
)

export default ActivateSwapArrow;