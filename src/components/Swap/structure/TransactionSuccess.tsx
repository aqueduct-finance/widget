import React from 'react';
import { useStore } from '../../../store';
import { HiCheckCircle } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';
import { Theme } from '../../../theme';

interface TransactionSuccessProps {
    swapTheme: Theme;
    outgoingFlowRate: number;
}

const TransactionSuccess = ({
    swapTheme,
    outgoingFlowRate
}: TransactionSuccessProps) => {
    const store = useStore()

    const importTokens = async () => {

        const ethereum = window.ethereum

        try {
            ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: store.outboundToken?.address,
                            symbol: store.outboundToken?.symbol,
                            decimals: store.outboundToken?.decimals,
                            image: 'https://foo.io/token-image.svg',
                        },
                    },
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div
            className="w-full flex flex-col items-center justify-center"
            style={{
                fontFamily: swapTheme.textFont
            }}
        >
            <div className="flex items-center justify-center h-[40%] w-full">
                <HiCheckCircle
                    className="w-2/3 h-2/3"
                    style={{
                        color: swapTheme.successColor
                    }}
                />
            </div>
            <div className="w-full flex items-center justify-center"
                style={{
                    color: swapTheme.primaryText,
                    fontWeight: swapTheme.primaryFontWeight
                }}
            >
                <h1 className="text-2xl">Transaction Submitted</h1>
            </div>
            <div className="flex items-center justify-center w-full py-2">
                <a href="https://www.aqueduct.fi" target="_blank" rel="noopener noreferrer">
                    <p className="hover:underline"
                        style={{
                            color: swapTheme.embeddedLink
                        }}
                    >View on Etherscan</p>
                </a>
            </div>
            <div className="w-full flex flex-row justify-between py-3 mt-8"
                style={{
                    borderTopColor: swapTheme.borderColor,
                    borderTopWidth: swapTheme.primaryBorderWidth,
                }}
            >
                <div className="w-full flex flex-row items-center px-2 py-1 justify-between">
                    <div className="flex flex-row items-center justify-center space-x-3">
                        <BiTime className="w-[20px] h-[20px]"
                            style={{
                                color: swapTheme.primaryText
                            }}
                        />
                        <p
                            style={{
                                color: swapTheme.accentText
                            }}
                        >Swapping {outgoingFlowRate.toFixed(5)} {store.outboundToken?.symbol} / {store.flowrateUnit.sublabel}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <a href="https://www.aqueduct.fi" target="_blank" rel="noopener noreferrer">
                            <p
                                className="hover:underline"
                                style={{
                                    color: swapTheme.embeddedLink
                                }}
                            >View</p>
                        </a>
                    </div>
                </div>
            </div>
            <button
                className={`w-full ease-in-out`}
                onClick={importTokens}
                style={{
                    backgroundColor: swapTheme.swapButton,
                    color: swapTheme.swapButtonText,
                    fontSize: swapTheme.swapButtonFontSize,
                    padding: swapTheme.swapButtonPadding,
                    fontWeight: swapTheme.primaryFontWeight,
                    transitionDuration: swapTheme.primaryDuration,
                    borderRadius: swapTheme.itemBorderRadius
                }}>
                Import Tokens
            </button>
        </div>
    )
}

export default TransactionSuccess;