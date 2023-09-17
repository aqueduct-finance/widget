import React from "react";
import { HiArrowSmDown } from "react-icons/hi";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface ActivateSwapArrowProps {
    swapTheme: Theme;
    overBalance: boolean;
}

const ActivateSwapArrow = ({ swapTheme }: ActivateSwapArrowProps) => {
    const store = useStore();

    const handleSwitch = () => {
        store.setOutboundToken(store.inboundToken);
        store.setInboundToken(store.outboundToken);
    };

    return (
        <div className="flex w-full items-center justify-center">
            <button className="px-1.5 py-1.5 opacity-90 hover:opacity-100"
                onClick={handleSwitch}
                style={{
                    backgroundColor: swapTheme.useMaxButton,
                    borderRadius: swapTheme.accentBorderRadius,
                }}
            >
                <HiArrowSmDown
                    className="text-xl"
                    style={{
                        color: swapTheme.accentText,
                    }}
                />
            </button>
        </div>
    );
};

export default ActivateSwapArrow;
