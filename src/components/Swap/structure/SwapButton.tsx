import React, { useState, useEffect } from "react";
import { SwapText } from "../../../theme/animation";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";
import getPoolAddress from "../helpers/getPool";
import { CollapseState } from "../../../types/CollapseState";

interface SwapButtonProps {
    swapTheme: Theme;
}

const SwapButton = ({
    swapTheme
}: SwapButtonProps) => {
    const store = useStore();
    const [poolExists, setPoolExists] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    // helper function to get the text that should be shown in the swap button
    function getButtonText() {
        // order is intentional here
        if (!store.inboundToken || !store.outboundToken) { return 'Select tokens'}
        if (!poolExists) { return 'Pool does not exist'}
        if (store.swapAmount <= 0) { return 'Enter amount'}
        if (store.isBalanceUnderSwapAmount()) { return `Insufficient ${store.outboundToken?.symbol} balance` }
        return 'Swap';
    }

    const handleSwapClick = () => {
        if (getButtonText() == 'Swap') {
            if (store.getAmountNeededToApproveForWrap() > 0) {
                store.setCollapseState(CollapseState.WRAP_TOKENS);
            } else {
                store.setCollapseState(CollapseState.SWAP_APPROVE);
            }
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
        <button className={`${getButtonText() != 'Swap' ? "opacity-50" : ""} mt-4 w-full`}
            onClick={handleSwapClick}
            style={{
                backgroundColor: swapTheme.swapButton,
                color: swapTheme.swapButtonText,
                fontSize: swapTheme.swapButtonFontSize,
                padding: swapTheme.swapButtonPadding,
                borderRadius: swapTheme.swapButtonRadius,
                fontWeight: swapTheme.titleFontWeight
            }}>
            <SwapText 
                swapTheme={swapTheme} 
                showAnimation={showAnimation}
            >
                {getButtonText()}
            </SwapText>
        </button>
    );
};

export default SwapButton;
