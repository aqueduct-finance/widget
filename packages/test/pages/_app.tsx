import type { AppProps } from "next/app";
import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import dynamic from 'next/dynamic';
import '../styles/globals.css';

const chains = [polygonMumbai];
/*
const TWAMMWidget = dynamic(() => import('../../widget/src/components/Swap'), {
  ssr: false
});
import { Theme } from "../../widget/src/theme";
import { darkTheme } from "../../widget/src/theme/defaultThemes";

const theme: Theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
}
*/

import TWAMMWidget from "aqueduct-widget";
import { darkTheme } from "aqueduct-widget";
import 'aqueduct-widget/styles';

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
                                <div className="w-[40rem]">
                                    <TWAMMWidget
                                        theme={theme}
                                    />
                                  </div>
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