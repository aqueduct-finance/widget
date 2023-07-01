import { goerli } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import React, { useEffect } from "react";
import Head from "next/head";
import SwapWidget from "./SwapWidget";
import { useStore } from "../../store";
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { TestTokens } from "../../utils/erc20s";

const chains = [goerli];

interface ExportedWidgetProps {
    theme: Theme;
    tokenOption: TokenTypes[];
    Web3Key: string;
    width: string;
    outboundToken: string;
    inboundToken: string;
    fontUrl: string;
}

// Buy back programs

const TWAMMWidget = ({
    theme,
    tokenOption,
    Web3Key,
    width,
    outboundToken,
    inboundToken,
    fontUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Red+Hat+Mono:wght@700&display=swap",
}: ExportedWidgetProps) => {
    const store = useStore();

    const config = createConfig(
        getDefaultConfig({
            alchemyId: Web3Key,
            walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

            appName: "Aqueduct",
            chains,
        })
    );

    const outboundTokenWithAddress =
        TestTokens.find((token) => token.address === outboundToken) ||
        tokenOption.find((token) => token.address === outboundToken);

    const inboundTokenWithAddress =
        TestTokens.find((token) => token.address === inboundToken) ||
        tokenOption.find((token) => token.address === inboundToken);

    useEffect(() => {
        if (outboundTokenWithAddress) {
            store.setOutboundToken(outboundTokenWithAddress);
        }
        if (inboundTokenWithAddress) {
            store.setInboundToken(inboundTokenWithAddress);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outboundTokenWithAddress, inboundTokenWithAddress]);

    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                <Head>
                    <style>@import url({fontUrl});</style>
                </Head>
                <SwapWidget
                    theme={theme}
                    tokenOption={tokenOption}
                    width={width}
                />
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

export default TWAMMWidget;
