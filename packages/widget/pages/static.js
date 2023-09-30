import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { useModal } from "connectkit";

const chains = [polygonMumbai];

import TWAMMWidget from "../dist/index.es.js";
import { darkTheme } from "../dist/index.es.js";

const theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
}

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // or infuraId
        walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

        // Required
        appName: "Aqueduct",
        chains
    }),
);

const MyApp = ({ Component, pageProps }) => {
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                <WidgetWrapper />
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

const WidgetWrapper = () => {

    const connectkitModal = useModal();

    return (
        <div
            style={{
                background: '#0F172E',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div
                style={{width: '26rem'}}
            >
                <TWAMMWidget
                    theme={theme}
                    onConnectWalletClick={() => {connectkitModal.setOpen(true)}}
                />
            </div>
        </div>
    );
}

export default MyApp;