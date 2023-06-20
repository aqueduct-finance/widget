import React, { useEffect } from 'react';
import Image from 'next/image';
import { Theme } from '../../../theme';
import { useStore } from '../../../store';
import { BsPlus } from 'react-icons/bs';
import { ethers } from 'ethers';
import { UseMaxText } from '../../../theme/animation';
import { BigNumber } from 'ethers';

interface OutboundBoxProps {
    swapTheme: Theme;
    outboundBalance: string;
    showMaxAnimation: boolean;
    setShowMaxAnimation: (value: boolean) => void;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    setSwapAmount: (value: number) => void;
    setDynamicInput: (value: string) => void;
}

const OutboundBox = ({
    swapTheme,
    outboundBalance,
    showMaxAnimation,
    setShowModal,
    setOutbound,
    setShowMaxAnimation,
    setSwapAmount,
    setDynamicInput
}: OutboundBoxProps) => {

    const store = useStore();

    const handleButtonClick = () => {
        setShowModal(true)
        setOutbound(true)
    }

    const handleUseMaxClick = (e) => {
        e.stopPropagation();
        if (store.outboundToken && parseInt(outboundBalance) > 0) {
            setSwapAmount(parseFloat(outboundBalance))
            setDynamicInput(outboundBalance)
        } else {
            setShowMaxAnimation(true);
            setTimeout(() => {
                setShowMaxAnimation(false);
            }, 300);
        }
    }

    return (
        <button
            type="button"
            className="flex p-3 mt-2 items-center hover:scale-[1.02] transition-all"
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.accentDuration,
                fontFamily: swapTheme.textFont
            }}
            onClick={handleButtonClick}
        >
            <div className="w-[40px] h-[40px]">
                {store.outboundToken ? (
                    <Image
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
                            borderRadius: swapTheme.itemBorderRadius
                        }}
                    >
                        <BsPlus className="w-full h-full" />
                    </div>
                )}
            </div>
            <div className="flex flex-col grow pl-3 space-y-1 items-start justify-center">
                <p className="leading-none text-sm"
                    style={{
                        color: swapTheme.secondaryText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        fontFamily: swapTheme.textFont
                    }}
                >
                    {store.outboundToken
                        ? store.outboundToken.name
                        : "You pay with:"}
                </p>
                <p className="leading-none text-xs"
                    style={{
                        color: swapTheme.accentText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        fontFamily: swapTheme.numberFont
                    }}
                >
                    {parseFloat(
                        outboundBalance
                    ) === 0 || !store.outboundToken || outboundBalance === undefined || isNaN(parseFloat(outboundBalance))
                        ? "0.0"
                        : (
                            parseFloat(outboundBalance)
                        ).toFixed(5)}
                </p>
            </div>
            <div
                className="text-xs h-8 px-4 hover:scale-110 hover:-translate-x-1 transition-all flex items-center justify-center"
                style={{
                    backgroundColor: swapTheme.useMaxButton,
                    color: swapTheme.useMaxText,
                    fontWeight: swapTheme.primaryFontWeight,
                    borderRadius: swapTheme.itemBorderRadius,
                    transitionDuration: swapTheme.accentDuration
                }}
                onClick={handleUseMaxClick}
            >
                <UseMaxText swapTheme={swapTheme} showMaxAnimation={showMaxAnimation}
                >Use Max</UseMaxText>
            </div>
        </button>
    )
}

export default OutboundBox;