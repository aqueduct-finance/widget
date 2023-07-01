import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
// import { getDefaultConfig } from "connectkit";
// import { createConfig } from "wagmi";
// import { goerli } from "wagmi/chains";

// prOs@agOtOfritre5HA66fi?OCHo8athixAz#d7fRastlh*ca1u=Odr!dreW7

// const chains = [goerli];

// const config = createConfig(
//     getDefaultConfig({
//         // Required API Keys
//         alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // or infuraId
//         walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

//         // Required
//         appName: "Your App Name",
//         chains,
//     })
// );

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <div>
            <div className="w-full h-screen poppins-font bg-black">
                <div className="flex flex-col md:flex-row h-full items-center md:items-stretch">
                    <main className="flex flex-col items-center space-y-4 md:space-y-16 px-4 w-full overflow-y-scroll">
                        <div className="md:h-[50%]" />
                        <Component {...pageProps} />
                        <div className="md:h-[50%]" />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MyApp;
