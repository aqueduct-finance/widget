import React from "react";
import { SwapText } from "../../../theme/animation";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface SwapButtonProps {
    swapTheme: Theme;
    overBalance: boolean;
    isEntered: boolean;
    showAnimation: boolean;
    setSwapActive: (value: boolean) => void;
    setShowAnimation: (value: boolean) => void;
}

const SwapButton = ({
    swapTheme,
    overBalance,
    isEntered,
    showAnimation,
    setSwapActive,
    setShowAnimation
}: SwapButtonProps) => {
    const store = useStore()

    const handleSwapClick = () => {
        if (!overBalance && isEntered) {
            setSwapActive(true);
        } else {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 300);
        }
    };

    return (
        <button className={`${overBalance || !isEntered ? "opacity-75" : ""} font-semibold 2rounded-gc-2xl mt-4`}
            onClick={handleSwapClick}
            style={{
                backgroundColor: swapTheme.swapButton,
                color: swapTheme.swapButtonText,
                fontSize: swapTheme.swapButtonFontSize,
                padding: swapTheme.swapButtonPadding,
                borderRadius: swapTheme.swapButtonRadius
            }}>
            <SwapText swapTheme={swapTheme} showAnimation={showAnimation}>{overBalance ? `Insufficient ${store.outboundToken?.symbol} balance` : 'Swap'}</SwapText>
        </button>
    )
}

export default SwapButton