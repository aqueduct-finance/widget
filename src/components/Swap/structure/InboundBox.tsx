import React from 'react';
import Image from 'next/image';
import { Theme } from '../../../theme';
import { useStore } from '../../../store';
import { BsPlus } from 'react-icons/bs';
import { ethers } from 'ethers';
import { BigNumber } from 'ethers';

interface OutboundBoxProps {
    swapTheme: Theme;
    inboundUnwrappedBalance: string;
    inboundWrappedBalance: BigNumber;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    isEntered: boolean;
}

const InboundBox = ({
    swapTheme,
    inboundUnwrappedBalance,
    inboundWrappedBalance,
    setShowModal,
    setOutbound,
    isEntered
}: OutboundBoxProps) => {

    const store = useStore();

    return (
        <button
            type="button"
            className={`${isEntered ? "" : "hover:scale-[1.02]"} flex p-3 -mt-4 items-center duration-200 transition-all`}
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius
            }}
            onClick={() => {
                setShowModal(true)
                setOutbound(false)
            }}
        >
            <div className="w-[40px] h-[40px]">
                {store.inboundToken ? (
                    <Image
                        src={store.inboundToken.logoURI}
                        width="40"
                        height="40"
                        alt="token"
                    />
                ) : (
                    <div className="rounded-full border-2"
                        style={{
                            backgroundColor: swapTheme.plusBg,
                            borderColor: swapTheme.plusBorder,
                            color: swapTheme.plusColor,
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
                        fontWeight: swapTheme.primaryFontWeight
                    }}
                >
                    {store.inboundToken
                        ? store.inboundToken.name
                        : "You receive:"}
                </p>
                <p className="leading-none text-xs monospace-font"
                    style={{
                        color: swapTheme.accentText,
                        fontWeight: swapTheme.secondaryFontWeight
                    }}
                >
                    {parseFloat(
                        inboundUnwrappedBalance
                    ) === 0 || !store.inboundToken || inboundUnwrappedBalance === undefined
                        ? "0.0"
                        : (
                            parseFloat(inboundUnwrappedBalance) +
                            parseFloat(ethers.utils.formatEther(inboundWrappedBalance))
                        ).toFixed(5)}
                </p>
            </div>
        </button>
    )
}

export default InboundBox;