import SwapWidget from "./SwapWidget";
import { goerli } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import React from "react";
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";

const chains = [goerli];

interface ExportedWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    Web3Key: string;
    chainName?: string;
    width?: string;
}

const TWAMMWidget = ({
    theme,
    tokenOption,
    defaultTokens,
    Web3Key,
    width
}: ExportedWidgetProps) => {

    const config = createConfig(
        getDefaultConfig({
            alchemyId: Web3Key,
            walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

            appName: "Aqueduct",
            chains
        }),
    );


    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                <SwapWidget
                    theme={theme}
                    tokenOption={tokenOption}
                    defaultTokens={defaultTokens}
                    width={width} />
            </ConnectKitProvider>
        </WagmiConfig>
    )
}

export default TWAMMWidget;