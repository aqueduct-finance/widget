import React from 'react'
import Image from 'next/image';
import { useStore } from '../../../store';
import { CollapseState } from '../../../types/CollapseState';

const TokenRow = ({ item, index, isHover, swapTheme, handleMouseEnter, handleMouseLeave, setOutboundToken, setInboundToken, outbound }) => {
    
    const store = useStore();

    return (
        <div
            className={`flex flex-row ease-in-out px-1 py-2 cursor-pointer`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => {
                if (!outbound) {
                    setInboundToken(item)
                } else {
                    setOutboundToken(item)
                }
                store.setCollapseState(CollapseState.NONE);
            }}
            style={{
                backgroundColor: isHover[index] ? swapTheme.streamLengthBox : 'transparent',
                borderRadius: swapTheme.accentBorderRadius,
                transitionDuration: swapTheme.secondaryDuration
            }}
            key={item.name}
        >
            <div className="px-2 py-2 flex items-center justify-center"
                style={{
                    borderRadius: swapTheme.itemBorderRadius
                }}
            >
                <Image
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
        </div>
    );
}

export default TokenRow;
