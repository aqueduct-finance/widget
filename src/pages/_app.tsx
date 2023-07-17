/* eslint-disable react/jsx-max-depth */

import type { AppProps } from "next/app";
import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import '../styles/globals.css';

// we will not be using _app.tsx for swap widget. This is strictly for testing.

const chains = [polygonMumbai];


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

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                <div>
                    <div className="w-full h-screen poppins-font bg-black">
                        <div className="flex flex-col md:flex-row h-full items-center md:items-stretch">
                            <main
                                className='flex flex-col items-center space-y-4 md:space-y-16 w-full overflow-y-scroll'
                            >
                                <div className="md:h-[50%]" />
                                <Component
                                    {...pageProps}
                                />
                                <div className="md:h-[50%]" />
                            </main>
                        </div>
                    </div>
                </div>
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

export default MyApp;