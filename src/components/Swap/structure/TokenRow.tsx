import React from 'react'
import Image from 'next/image';

const TokenRow = ({ item, index, isHover, swapTheme, handleMouseEnter, handleMouseLeave, setOutboundToken, setInboundToken, setDisplay, outbound }) => (
    <div
        className={`flex flex-row rounded-lg ease-in-out px-1 py-2 duration-100 cursor-pointer`}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave(index)}
        onClick={() => {
            if (!outbound) {
                setInboundToken(item)
            } else {
                setOutboundToken(item)
            }
            setDisplay(false)
        }}
        style={{
            backgroundColor: isHover[index] ? swapTheme.streamLengthBox : 'transparent',
        }}
        key={item.name}
    >
        <div className="px-2 py-2 flex items-center justify-center">
            <Image
                src={item.logoURI}
                width={50}
                height={50}
                alt="token-logo"
            />
        </div>
        <div className="flex flex-col w-full items-start px-1 justify-center">
            <h1 className="2text-lg font-semibold text-white">{item.underlyingToken ? item.underlyingToken.symbol : item.symbol}</h1>
            <p
                className=" text-xs"
                style={{
                    color: swapTheme.accentText,
                }}
            >
                {item.underlyingToken ? item.underlyingToken.name : item.name}
            </p>
        </div>
    </div>
);

export default TokenRow;