import { TokenTypes } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
import { defaultTheme } from "../../../theme/theme";
import TokenRow from "./TokenRow";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface TokenDisplayProps {
    tokenOption: TokenTypes[];
    theme: Theme;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    outbound: boolean;
}

const TokenDisplay = ({ tokenOption, theme, setOutboundToken, setInboundToken, outbound }: TokenDisplayProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTokens = tokenOption.filter(
        (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tokensToRender = searchQuery ? filteredTokens : tokenOption;

    return (
        <div>
            <div className="w-full flex flex-row items-center justify-between">
                <div 
                    className="w-full h-12 items-center flex flex-row space-x-3 ease-in-out outline mt-[0.1rem] mx-[0.1rem]  focus-within:ring-white/25 focus-within:ring-1"
                    style={{
                        backgroundColor: swapTheme.tokenBox,
                        borderRadius: swapTheme.secondaryBorderRadius,
                        outlineColor: swapTheme.accentBorderColor,
                        outlineWidth: swapTheme.accentBorderWidth,
                    }}
                >
                    <FiSearch
                        className="ml-4 h-5 w-5 cursor-text"
                        style={{
                            color: swapTheme.accentText
                        }}
                    />
                    <input
                        className="w-full h-full focus:outline-none border-transparent bg-transparent text-sm"
                        style={{
                            color: swapTheme.primaryText,
                        }}
                        type="text"
                        placeholder="Search tokens..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full space-y-2 py-4">
                {tokensToRender.map((item) => (
                    <TokenRow
                        item={item}
                        swapTheme={swapTheme}
                        setOutboundToken={setOutboundToken}
                        setInboundToken={setInboundToken}
                        outbound={outbound}
                        key={item.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default TokenDisplay;
