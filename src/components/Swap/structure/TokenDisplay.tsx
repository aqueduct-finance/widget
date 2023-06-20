import { TokenTypes } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import TokenRow from "./TokenRow";
import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'
import styled from "styled-components";

interface TokenDisplayProps {
    tokenOption: TokenTypes[];
    display: boolean;
    theme: Theme;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    setDisplay: (value: boolean) => void;
    outbound: boolean;
}

const Container = styled.div<{ display: boolean }>`
overflow: hidden; 
padding-left: 1rem;
padding-right: 1rem; 
background-color: transparent; 
transition-duration: 300ms; 
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
flex-direction: column; 
justify-content: flex-start; 
align-items: flex-start; 
width: 100%; 
height: 100%; 
border-radius: 2rem;
display: ${({ display }) => (display ? 'flex' : "hidden")};

&::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &.show-scrollbar {
    overflow: auto;
  }
`

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
        <Container display={display}>
            <div className="w-full flex items-start justify-between px-4 py-1">
                <h1
                    className="text-xl"
                    style={{
                        color: swapTheme.TitleColor,
                        fontWeight: swapTheme.primaryFontWeight,
                        fontFamily: swapTheme.textFont
                    }}
                >Select Token</h1>
                <IoMdClose className="text-3xl cursor-pointer ease-in-out"
                    style={{
                        color: isExitHover ? swapTheme.accentText : swapTheme.primaryText,
                        transitionDuration: swapTheme.secondaryDuration
                    }}
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
            <div className="w-full px-4 py-4 flex flex-row items-center justify-between">
                <div className="w-full h-14 items-center flex flex-row space-x-2 ease-in-out"
                    style={{
                        backgroundColor: swapTheme.streamLengthBox,
                        borderColor: isInputHover ? 'transparent' : swapTheme.borderColor,
                        borderWidth: swapTheme.primaryBorderWidth,
                        borderRadius: swapTheme.accentBorderRadius,
                        transitionDuration: swapTheme.primaryDuration
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
                className="w-full space-y-0"
                style={{
                    backgroundColor: "transparent"
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
                        setDisplay={setDisplay}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        key={item.name}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TokenDisplay;