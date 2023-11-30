import React from 'react'
import { useStore } from '../../../store';
import { CollapseState } from '../../../types/CollapseState';
import { Theme } from '../../../theme';
import { TokenTypes } from '../../../types/TokenOption';

interface TokenRowProps {
    item: TokenTypes;
    swapTheme: Theme;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    outbound: boolean;
}

const TokenRow = ({ item, swapTheme, setOutboundToken, setInboundToken, outbound }: TokenRowProps) => {
    
    const store = useStore();

    return (
        <button
            className={`relative flex flex-row w-full ease-in-out px-1 py-2 cursor-pointer opacity-80 hover:opacity-100`}
            onClick={() => {
                if (!outbound) {
                    setInboundToken(item)
                } else {
                    setOutboundToken(item)
                }
                store.setCollapseState(CollapseState.NONE);
            }}
            style={{
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.secondaryDuration
            }}
            key={item.name}
        >
            {/* Need this to animate the theme's bg color with tailwind: */}
            <div 
                className='absolute top-0 bottom-0 left-0 right-0 opacity-20 hover:opacity-50' 
                style={{
                    backgroundColor: swapTheme.tokenBox,
                    borderRadius: swapTheme.secondaryBorderRadius,
                    transitionDuration: swapTheme.secondaryDuration
                }}
            />

            <div className="px-2 py-2 flex items-center justify-center"
                style={{
                    borderRadius: swapTheme.itemBorderRadius
                }}
            >
                <img
                    src={item.logoURI}
                    width={50}
                    height={50}
                    alt="token-logo"
                />
            </div>
            <div className="flex flex-col w-full items-start px-1 justify-center"
                style={{
                    fontFamily: swapTheme.textFont
                }}
            >
                <h1
                    className="text-lg h-1/2 mt-0.5"
                    style={{
                        color: swapTheme.primaryText,
                    }}
                >{item.underlyingToken ? item.underlyingToken.symbol : item.symbol}</h1>
                <p
                    className="h-1/2"
                    style={{
                        color: swapTheme.accentText,
                    }}
                >
                    {item.underlyingToken ? item.underlyingToken.name : item.name}
                </p>
            </div>
        </button>
    );
}

export default TokenRow;
