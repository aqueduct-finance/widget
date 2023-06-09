import { TokenTypes } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import TokenRow from "./TokenRow";
import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'

interface TokenDisplayProps {
    tokenOption?: TokenTypes[];
    display: boolean;
    theme?: Theme;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    setDisplay: (value: boolean) => void;
    outbound: boolean;
}

const TokenDisplay = ({ tokenOption, display, theme, setDisplay, setOutboundToken, setInboundToken, outbound }: TokenDisplayProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const [isHover, setIsHover] = useState(tokenOption.map(() => false));
    const [searchQuery, setSearchQuery] = useState('');
    const [isExitHover, setIsExitHover] = useState(false);
    const [isInputHover, setIsInputHover] = useState(false);

    const filteredTokens = tokenOption.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tokensToRender = searchQuery ? filteredTokens : tokenOption;

    const handleMouseEnter = (index) => {
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
        <div className={`${display ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out duration-300 rounded-[2rem] bg-transparent px-4 overflow-auto`}
            style={{
                scrollbarWidth: 'none'
            }}
        >
            <div className="w-full flex items-start justify-between px-4 py-1">
                <h1
                    className="text-xl"
                    style={{
                        color: swapTheme.primaryText
                    }}
                >Select Token</h1>
                <IoMdClose className="text-3xl cursor-pointer ease-in-out duration-100"
                    style={{ color: isExitHover ? swapTheme.tokenBalance : swapTheme.primaryText }}
                    onMouseEnter={() => {
                        setIsExitHover(true)
                    }}
                    onMouseLeave={() => {
                        setIsExitHover(false)
                    }}
                    onClick={() => {
                        setDisplay(false)
                    }}
                />
            </div>
            <div className="w-full  px-4 py-4 flex flex-row items-center justify-between">
                <div className="w-full h-14 rounded-lg items-center flex flex-row space-x-2"
                    style={{
                        backgroundColor: swapTheme.streamLengthBox,
                        borderColor: isInputHover ? 'transparent' : swapTheme.borderColor,
                        borderWidth: swapTheme.borderWidth
                    }}
                    onMouseEnter={() => {
                        setIsInputHover(true)
                    }}
                    onMouseLeave={() => {
                        setIsInputHover(false)
                    }}
                >
                    <FiSearch className="ml-2 h-6 w-6 cursor-text"
                        style={{
                            color: swapTheme.primaryText
                        }}
                    />
                    <input
                        className="w-full h-full rounded-lg focus:outline-none border-transparent"
                        style={{
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.primaryText,
                        }}
                        type="text"
                        placeholder="Search tokens..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full bg-transparent space-y-0">
                {tokensToRender.map((item, index) => (
                    <TokenRow
                        item={item}
                        index={index}
                        isHover={isHover}
                        swapTheme={swapTheme}
                        setOutboundToken={setOutboundToken}
                        setInboundToken={setInboundToken}
                        outbound={outbound}
                        setDisplay={setDisplay}
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