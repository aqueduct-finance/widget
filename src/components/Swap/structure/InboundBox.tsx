import React from "react";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface OutboundBoxProps {
    swapTheme: Theme;
    inboundBalance: string;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    isEntered: boolean;
}

const InboundBox = ({
    swapTheme,
    inboundBalance,
    setShowModal,
    setOutbound,
    isEntered,
}: OutboundBoxProps) => {
    const store = useStore();

    return (
        <button
            type="button"
            className={`${
                isEntered ? "" : "hover:scale-[1.02]"
            } flex p-3 -mt-3 items-center transition-all`}
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.accentDuration,
            }}
            onClick={() => {
                setShowModal(true);
                setOutbound(false);
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
                    <div
                        style={{
                            backgroundColor: swapTheme.plusBg,
                            borderColor: swapTheme.plusBorder,
                            borderWidth: swapTheme.secondaryBorderWidth,
                            color: swapTheme.plusColor,
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
                    {store.inboundToken
                        ? store.inboundToken.name
                        : "You receive:"}
                </p>
                <p
                    className="leading-none text-xs"
                    style={{
                        color: swapTheme.accentText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        fontFamily: swapTheme.numberFont,
                    }}
                >
                    {parseFloat(inboundBalance) === 0 ||
                    !store.inboundToken ||
                    inboundBalance === undefined ||
                    Number.isNaN(parseFloat(inboundBalance))
                        ? "0.0"
                        : parseFloat(inboundBalance).toFixed(5)}
                </p>
            </div>
        </button>
    );
};

export default InboundBox;
