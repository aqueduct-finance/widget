import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];

import TWAMMWidget from "aqueduct-widget";
import { darkTheme } from "aqueduct-widget";

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
                <div
                    style={{
                        background: 'black',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{width: '30rem'}}
                    >
                        <TWAMMWidget
                            theme={theme}
                            tokenOption={}
                        />
                    </div>
                </div>
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

export default MyApp;