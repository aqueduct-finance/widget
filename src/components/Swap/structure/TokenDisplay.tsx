import { TokenTypes } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
import { defaultTheme } from "../../../theme/theme";
import TokenRow from "./TokenRow";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

interface TokenDisplayProps {
    tokenOption: TokenTypes[];
    theme: Theme;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    outbound: boolean;
}

const TokenDisplay = ({ tokenOption, theme, setOutboundToken, setInboundToken, outbound }: TokenDisplayProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const [isHover, setIsHover] = useState(tokenOption.map(() => false));
    const [searchQuery, setSearchQuery] = useState("");
    const [isExitHover, setIsExitHover] = useState(false);
    const [isInputHover, setIsInputHover] = useState(false);

    const filteredTokens = tokenOption.filter(
        (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tokensToRender = searchQuery ? filteredTokens : tokenOption;

    const handleMouseEnter = (index: number) => {
        setIsHover((prevStates) =>
            prevStates.map((state, i) => (i === index ? true : state))
        );
    };

    const handleMouseLeave = (index) => {
        setIsHover((prevStates) =>
            prevStates.map((state, i) => (i === index ? false : state))
        );
    };

    return (
        <div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="w-full h-14 items-center flex flex-row space-x-2 ease-in-out"
                    style={{
                        backgroundColor: swapTheme.streamLengthBox,
                        borderColor: isInputHover
                            ? "transparent"
                            : swapTheme.borderColor,
                        borderWidth: swapTheme.primaryBorderWidth,
                        borderRadius: swapTheme.accentBorderRadius,
                        transitionDuration: swapTheme.primaryDuration,
                    }}
                    onMouseEnter={() => {
                        setIsInputHover(true);
                    }}
                    onMouseLeave={() => {
                        setIsInputHover(false);
                    }}
                >
                    <FiSearch
                        className="ml-2 h-6 w-6 cursor-text"
                        style={{
                            color: swapTheme.primaryText,
                        }}
                    />
                    <input
                        className="w-full h-full focus:outline-none border-transparent"
                        style={{
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.primaryText,
                            borderRadius: swapTheme.accentBorderRadius,
                        }}
                        type="text"
                        placeholder="Search tokens..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div
                className="w-full space-y-0 py-4"
                style={{
                    backgroundColor: "transparent",
                }}
            >
                {tokensToRender.map((item, index) => (
                    <TokenRow
                        item={item}
                        index={index}
                        isHover={isHover}
                        swapTheme={swapTheme}
                        setOutboundToken={setOutboundToken}
                        setInboundToken={setInboundToken}
                        outbound={outbound}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        key={item.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default TokenDisplay;
