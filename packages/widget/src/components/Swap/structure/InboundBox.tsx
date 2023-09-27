import React from "react";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";
import { BsPlus } from "react-icons/bs";

interface OutboundBoxProps {
    swapTheme: Theme;
}

const InboundBox = ({
    swapTheme
}: OutboundBoxProps) => {
    const store = useStore();

    return (
        <div
            className={`flex p-3 items-center transition-all w-full`}
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.accentDuration,
            }}
        >
            <div className="w-[40px] h-[40px]">
                {store.inboundToken ? (
                    <img
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
                        ? store.inboundToken.symbol
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
                    {
                        (store.getCombinedInboundBalance() === 0 || !store.inboundToken)
                            ? "0.0"
                            : (store.getCombinedInboundBalance()).toFixed(5)
                    }
                </p>
            </div>
        </div>
    )
}

export default InboundBox;
