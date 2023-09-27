import React, { useState } from 'react';
import { Theme } from '../../../theme';
import { useStore } from '../../../store';
import { BsPlus } from 'react-icons/bs';
//import { UseMaxText } from '../../../theme/animation';
import { CollapseState } from '../../../types/CollapseState';

interface OutboundBoxProps {
    swapTheme: Theme;
}

const OutboundBox = ({
    swapTheme
}: OutboundBoxProps) => {
    const store = useStore();

    const [showMaxAnimation, setShowMaxAnimation] = useState(false);

    const handleUseMaxClick = (e) => {
        e.stopPropagation();
        const outboundBalance = store.outboundTokenBalance + store.underlyingOutboundTokenBalance;
        if (store.outboundToken && outboundBalance > 0) {
            store.setSwapAmount(outboundBalance);
        } else {
            setShowMaxAnimation(true);
            setTimeout(() => {
                setShowMaxAnimation(false);
            }, 300);
        }
    };

    return (
        <div
            //type="button"
            className="flex p-3 items-center transition-all w-full"
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.accentDuration,
                fontFamily: swapTheme.textFont,
            }}
        >
            <div className="w-[40px] h-[40px]">
                {store.outboundToken ? (
                    <img
                        src={store.outboundToken.logoURI}
                        width="40"
                        height="40"
                        alt="Token"
                    />
                ) : (
                    <div
                        style={{
                            backgroundColor: swapTheme.plusBg,
                            borderColor: swapTheme.plusBorder,
                            color: swapTheme.plusColor,
                            borderWidth: swapTheme.secondaryBorderWidth,
                            borderRadius: swapTheme.itemBorderRadius,
                        }}
                    >
                        <BsPlus className="w-full h-full" />
                    </div>
                )}
            </div>
            <div className="flex flex-col grow pl-3 space-y-1 items-start justify-center">
                <p
                    className="leading-none text-sm"
                    style={{
                        color: swapTheme.secondaryText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        fontFamily: swapTheme.textFont,
                    }}
                >
                    {store.outboundToken
                        ? store.outboundToken.symbol
                        : "You pay with:"}
                </p>
                <p
                    className="leading-none text-xs"
                    style={{
                        color: swapTheme.accentText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        fontFamily: swapTheme.numberFont,
                    }}
                >
                    {
                        (store.getCombinedOutboundBalance() === 0 || !store.outboundToken)
                            ? "0.0"
                            : (store.getCombinedOutboundBalance()).toFixed(5)
                    }
                </p>
            </div>
            <div
                className={`text-xs h-8 px-4 hover:scale-110 hover:-translate-x-1 transition-all flex items-center justify-center ${store.collapseState == CollapseState.OUTBOUND_TOKEN_SELECT ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{
                    backgroundColor: swapTheme.useMaxButton,
                    color: swapTheme.useMaxText,
                    fontWeight: swapTheme.primaryFontWeight,
                    borderRadius: swapTheme.itemBorderRadius,
                    transitionDuration: swapTheme.accentDuration,
                }}
                onClick={handleUseMaxClick}
            >
                {/*<UseMaxText 
                    swapTheme={swapTheme} 
                    showMaxAnimation={showMaxAnimation}
                >
                    Use Max
                </UseMaxText>*/}
                Use Max
            </div>
        </div>
    )
}

export default OutboundBox;
