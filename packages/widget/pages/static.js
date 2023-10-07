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
    bgColor: '#00000050',
    streamLengthBox: '#ffffff14',
    tokenBox: '#ffffff14',
    useMaxButton: '#ffffff20',
    textFont: "'Neue Haas Grotesk Display Pro Roman', sans-serif",
    numberFont: "'Neue Haas Grotesk Display Pro', sans-serif",
    primaryFontWeight: '500',
    titleFontWeight: '500',
    accentFontWeight: '500',
    borderColor: '#ffffff18',
    swapButtonRadius: '1.5rem',
    timeSelectBottomBorderRadius: '1.5rem',
    accentBorderWidth: '1px',
    accentBorderColor: '#FFFFFF20'
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
                    tokenOption={customTokens}
                    onConnectWalletClick={() => {connectkitModal.setOpen(true)}}
                />
            </div>
        </div>
    );
}

export default MyApp;