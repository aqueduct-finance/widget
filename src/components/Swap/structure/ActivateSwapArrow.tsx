import React from "react";
import { HiSwitchVertical } from "react-icons/hi";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface ActivateSwapArrowProps {
    swapTheme: Theme;
    overBalance: boolean;
    isEntered: boolean;
    setSwapActive: (value: boolean) => void;
}

const ActivateSwapArrow = ({
    swapTheme,
}: ActivateSwapArrowProps) => {

    const store = useStore()

    const handleSwitch = () => {
        store.setOutboundToken(store.inboundToken)
        store.setInboundToken(store.outboundToken)
    }

    return (
        <div className="flex w-full items-center justify-center -mt-3">
            <div className="px-1.5 py-1.5 z-10 opacity-80 hover:opacity-100 cursor-pointer"
                onClick={handleSwitch}
                style={{
                    backgroundColor: swapTheme.useMaxButton,
                    borderRadius: swapTheme.accentBorderRadius
                }}
            >
                <HiSwitchVertical className="text-xl"
                    style={{
                        color: swapTheme.accentText
                    }}
                />
            </div>
        </div>
    )
}

export default ActivateSwapArrow;