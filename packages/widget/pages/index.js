import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];

import TWAMMWidget, { darkTheme } from "../src/components/Swap";

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

const customTokens = [
    {
        name: 'DAI Test',
        address: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
        symbol: 'DTST',
        decimals: 18,
        chainId: 80001,
        logoURI: '/dai-logo.png'
    },
    {
        name: 'USDC Test',
        address: '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7',
        symbol: 'UTST',
        decimals: 18,
        chainId: 80001,
        logoURI: '/usdc-logo.png'
    }
]

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
                            tokenOption={customTokens}
                        />
                    </div>
                </div>
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

export default MyApp;