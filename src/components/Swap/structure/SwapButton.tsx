import React, { useState, useEffect } from "react";
import { SwapText } from "../../../theme/animation";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";
import getPoolAddress from "../helpers/getPool";

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
    setShowAnimation,
}: SwapButtonProps) => {
    const store = useStore()
    const [poolExists, setPoolExists] = useState(false)

    const handleSwapClick = () => {
        if (!overBalance && isEntered && poolExists) {
            setSwapActive(true);
        } else {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 300);
        }
    };

    useEffect(() => {
        try {
            getPoolAddress(
                store.inboundToken?.address,
                store.outboundToken?.address
            );
            setPoolExists(true)
        } catch (err) {
            setPoolExists(false)
        }
    }, [store.inboundToken, store.outboundToken])

    return (
        <button className={`${overBalance || !isEntered || !poolExists ? "opacity-75" : ""} mt-4`}
            onClick={handleSwapClick}
            style={{
                backgroundColor: swapTheme.swapButton,
                color: swapTheme.swapButtonText,
                fontSize: swapTheme.swapButtonFontSize,
                padding: swapTheme.swapButtonPadding,
                borderRadius: swapTheme.swapButtonRadius,
                fontWeight: swapTheme.primaryFontWeight
            }}>
            {poolExists ? (
                <SwapText swapTheme={swapTheme} showAnimation={showAnimation}>{overBalance ? `Insufficient ${store.outboundToken?.symbol} balance` : 'Swap'}</SwapText>
            ) : (
                <SwapText swapTheme={swapTheme} showAnimation={showAnimation}>Pool does not exist</SwapText>
            )}
        </button>
    )
}

export default SwapButton