import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { useAccount } from "wagmi";
import { useStore } from "../../../store";
import { Theme } from "../../../theme";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";

interface TransactionSuccessProps {
    swapTheme: Theme;
    outgoingFlowRate: number;
    tx: string;
    endFlow: GenericDropdownOption;
}

const TransactionSuccess = ({
    swapTheme,
    outgoingFlowRate,
    tx,
    endFlow,
}: TransactionSuccessProps) => {
    const store = useStore();

    const { address } = useAccount();

    const importTokens = async () => {
        const { ethereum } = window;

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

    const etherScanBaseUrl = "https://goerli.etherscan.io/tx";

    const userTX = `${etherScanBaseUrl}/${tx}`;

    const aqueductUrl = `https://demo.aqueduct.fi/pair/goerli/${address}/${store.outboundToken?.address}/${store.inboundToken?.address}`;

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{
                fontFamily: swapTheme.textFont,
            }}
        >
            <div className="flex items-center justify-center h-44 w-full mt-[70px]">
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
                    <p
                        className="hover:underline"
                        style={{
                            color: swapTheme.embeddedLink,
                        }}
                    >
                        View on Etherscan
                    </p>
                </a>
            </div>
            <div className="flex grow" />
            <div
                className="w-full flex flex-row justify-between py-3 mt-4"
                style={{
                    borderTopColor: swapTheme.borderColor,
                    borderTopWidth: swapTheme.primaryBorderWidth,
                }}
            >
                <div className="w-full flex flex-row items-center px-2 py-1 justify-between">
                    <div className="flex flex-row items-center justify-center space-x-3">
                        <BiTime
                            className="w-[20px] h-[20px]"
                            style={{
                                color: swapTheme.primaryText,
                            }}
                        />
                        <p
                            style={{
                                color: swapTheme.accentText,
                            }}
                        >
                            Swapping {outgoingFlowRate.toFixed(5)}{" "}
                            {store.outboundToken?.symbol} / {endFlow?.sublabel}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <a
                            href={aqueductUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p
                                className="hover:underline"
                                style={{
                                    color: swapTheme.embeddedLink,
                                }}
                            >
                                View
                            </p>
                        </a>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="w-full ease-in-out"
                onClick={importTokens}
                style={{
                    backgroundColor: swapTheme.swapButton,
                    color: swapTheme.swapButtonText,
                    fontSize: swapTheme.swapButtonFontSize,
                    padding: swapTheme.swapButtonPadding,
                    fontWeight: swapTheme.primaryFontWeight,
                    transitionDuration: swapTheme.primaryDuration,
                    borderRadius: swapTheme.itemBorderRadius,
                }}
            >
                Import Tokens
            </button>
        </div>
    );
};

export default TransactionSuccess;
