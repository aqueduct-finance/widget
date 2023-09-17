import React from 'react';
import { useStore } from '../../../store';
import { HiCheckCircle } from 'react-icons/hi';
import { Theme } from '../../../theme';
import { useAccount } from 'wagmi';
import { CollapseState } from '../../../types/CollapseState';
import { FiChevronLeft } from 'react-icons/fi';

interface TransactionSuccessProps {
    swapTheme: Theme;
}

const TransactionSuccess = ({
    swapTheme
}: TransactionSuccessProps) => {
    const store = useStore();

    const { address } = useAccount()
    const tx = store.lastSwapTx;

    const importOutbound = async () => {

        const ethereum = window.ethereum

        try {
            ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: store.outboundToken?.address,
                        symbol: store.outboundToken?.symbol,
                        decimals: store.outboundToken?.decimals,
                        image: "https://foo.io/token-image.svg",
                    },
                },
            });
        } catch (err) {
            console.log(err);
        }
    };
    
    const importInbound = async () => {

        const ethereum = window.ethereum

        try {
            ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: store.inboundToken?.address,
                            symbol: store.inboundToken?.symbol,
                            decimals: store.inboundToken?.decimals,
                            image: 'https://foo.io/token-image.svg',
                        },
                    },
                })
        } catch (err) {
            console.log(err)
        }
    }

    const etherScanBaseUrl = 'https://mumbai.polygonscan.com/tx';

    const userTX = `${etherScanBaseUrl}/${tx}`

    const aqueductUrl = `https://demo.aqueduct.fi/pair/mumbai/${address}/${store.outboundToken?.address}/${store.inboundToken?.address}`

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{
                fontFamily: swapTheme.textFont,
            }}
        >
            <div className='px-2 pt-4 w-full'>
                <button 
                    className="flex items-center justify-center space-x-1 text-xs w-min pr-4 pl-3 py-2 rounded-full mb-2 hover:scale-105 duration-300 transition-all"
                    onClick={() => store.setCollapseState(CollapseState.NONE)}
                    style={{
                        backgroundColor: swapTheme.streamLengthBox,
                        color: swapTheme.accentText,

                    }}
                >
                    <FiChevronLeft />
                    <p>back</p>
                </button>
            </div>
            <div className="flex items-center justify-center h-44 w-full mt-6">
                <HiCheckCircle
                    className="w-5/6 h-5/6"
                    style={{
                        color: swapTheme.successColor,
                    }}
                />
            </div>
            <div
                className="w-full flex items-center justify-center"
                style={{
                    color: swapTheme.primaryText,
                    fontWeight: swapTheme.primaryFontWeight,
                }}
            >
                <h1 className="text-2xl">Transaction Submitted</h1>
            </div>
            <div className="flex items-center justify-center w-full pt-2">
                <a href={userTX} target="_blank" rel="noopener noreferrer">
                    <p className="hover:underline"
                        style={{
                            color: swapTheme.embeddedLink,
                        }}
                    >View on block explorer</p>
                </a>
            </div>
            <div className='px-8 pt-6 pb-10 w-full space-x-2 flex'>
                {
                    store.outboundToken &&
                    <button 
                        className='flex space-x-3 items-center justify-center p-4 w-1/2 text-xs hover:scale-[1.02] duration-300 transition-all'
                        style={{
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.accentText,
                            borderRadius: swapTheme.secondaryBorderRadius
                        }}
                        onClick={importOutbound}
                    >
                        <img
                            src={store.outboundToken.logoURI}
                            width="20"
                            height="20"
                            alt="token"
                            className='opacity-80'
                        />
                        <p>
                            Import {store.outboundToken.symbol}  
                        </p>
                    </button>
                }
                {
                    store.inboundToken &&
                    <button 
                        className='flex space-x-3 items-center justify-center p-4 w-1/2 text-xs hover:scale-[1.02] duration-300 transition-all'
                        style={{
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.accentText,
                            borderRadius: swapTheme.secondaryBorderRadius
                        }}
                        onClick={importInbound}
                    >
                        <img
                            src={store.inboundToken.logoURI}
                            width="20"
                            height="20"
                            alt="token"
                            className='opacity-80'
                        />
                        <p>
                            Import {store.inboundToken.symbol}  
                        </p>
                    </button>
                }
            </div>
            <a 
                href={aqueductUrl}
                className={`w-full ease-in-out text-center`}
                style={{
                    backgroundColor: swapTheme.swapButton,
                    color: swapTheme.swapButtonText,
                    fontSize: swapTheme.swapButtonFontSize,
                    padding: swapTheme.swapButtonPadding,
                    fontWeight: swapTheme.primaryFontWeight,
                    transitionDuration: swapTheme.primaryDuration,
                    borderRadius: swapTheme.itemBorderRadius
                }}
            >
                View Position
            </a>
        </div>
    );
};

export default TransactionSuccess;
