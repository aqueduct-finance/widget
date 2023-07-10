import React from "react";
import Image from "next/image";
import { TokenTypes } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface TokenRowProps {
    item: TokenTypes;
    index: number;
    isHover: Array<boolean>;
    swapTheme: Theme;
    outbound: boolean;
    setDisplay: (value: boolean) => void;
    handleMouseEnter: (index: number) => void;
    handleMouseLeave: (index: number) => void;
}

const TokenRow = ({
    item,
    index,
    isHover,
    swapTheme,
    outbound,
    setDisplay,
    handleMouseEnter,
    handleMouseLeave,
}: TokenRowProps) => {
    const { setOutboundToken, setInboundToken } = useStore();

    return (
        <button
            type="button"
            className="flex flex-row ease-in-out px-1 py-2 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => {
                if (!outbound) {
                    setInboundToken(item);
                } else {
                    setOutboundToken(item);
                }
                setDisplay(false);
            }}
            style={{
                backgroundColor: isHover[index]
                    ? swapTheme.streamLengthBox
                    : "transparent",
                borderRadius: swapTheme.accentBorderRadius,
                transitionDuration: swapTheme.secondaryDuration,
            }}
            key={item.name}
        >
            <div
                className="px-2 py-2 flex items-center justify-center"
                style={{
                    borderRadius: swapTheme.itemBorderRadius,
                }}
            >
                <Image
                    src={item.logoURI}
                    width={50}
                    height={50}
                    alt="token-logo"
                />
            </div>
            <div
                className="flex flex-col w-full items-start px-1 justify-center"
                style={{
                    fontFamily: swapTheme.textFont,
                }}
            >
                <h1
                    className="text-lg h-1/2 mt-0.5"
                    style={{
                        color: swapTheme.primaryText,
                    }}
                >
                    {item.underlyingToken
                        ? item.underlyingToken.symbol
                        : item.symbol}
                </h1>
                <p
                    className="h-1/2"
                    style={{
                        color: swapTheme.accentText,
                    }}
                >
                    {item.underlyingToken
                        ? item.underlyingToken.name
                        : item.name}
                </p>
            </div>
        </button>
    );
};

export default TokenRow;
