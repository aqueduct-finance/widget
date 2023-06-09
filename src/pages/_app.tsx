import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
    getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from 'viem'
import { goerli } from "wagmi/chains";


// we will not be using _app.tsx for swap widget. This is strictly for testing.

// prOs@agOtOfritre5HA66fi?OCHo8athixAz#d7fRastlh*ca1u=Odr!dreW7

const chains = [goerli];

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // or infuraId
        walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

        // Required
        appName: "Your App Name",
        chains
    }),
);

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [isShown, setIsShown] = useState(false);
    const router = useRouter();

    // dark mode params
    const [isDark, setIsDark] = useState<boolean>(false);
    useEffect(() => {
        const dark = document.documentElement.classList.contains("dark");
        setIsDark(dark);

        if (dark) {
            document.body.style.background = "#000000";
        }
    }, [setIsDark]);

    // route to welcome message if first time user
    useEffect(() => {
        if (
            router.pathname.substring(0, 5) !== "/pair" &&
            !localStorage.getItem("hide-welcome-message")
        ) {
            router.push("/welcome");
            localStorage.setItem("hide-welcome-message", "true");
        }
    }, [router]);

    return (
        <div>
            <WagmiConfig config={config}>
                <ConnectKitProvider>
                    {/*
                                <DynamicTutorialProvider>
                                    <div className="w-full h-screen text-slate-500 poppins-font bg-white dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-blueBlack dark:to-black">
                                        <div className="flex flex-col md:flex-row h-full items-center md:items-stretch">
                                            <div className="w-full md:w-auto md:p-4">
                                                <Sidebar
                                                    isShown={isShown}
                                                    setIsShown={setIsShown}
                                                />
                                            </div>
                                            <main
                                                className={`flex flex-col items-center space-y-4 md:space-y-16 px-4 w-full overflow-y-scroll ${
                                                    isShown && " hidden md:flex "
                                                }`}
                                            >
                                                <div className="md:h-[50%]" />
                                                <Component
                                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                                    {...pageProps}
                                                />
                                                <div className="md:h-[50%]" />
                                                <ToastContainer
                                                    toastClassName="relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                                                    bodyClassName={() =>
                                                        "text-lg font-white font-med block p-4"
                                                    }
                                                    position="bottom-right"
                                                    autoClose={5000}
                                                />
                                            </main>
                                        </div>
                                        <TutorialChecklistPopup />
                                    </div>
                                </DynamicTutorialProvider>
                            */}
                    <div className="w-full h-screen poppins-font bg-black">
                        <div className="flex flex-col md:flex-row h-full items-center md:items-stretch">
                            <main
                                className={`flex flex-col items-center space-y-4 md:space-y-16 px-4 w-full overflow-y-scroll ${isShown && " hidden md:flex "
                                    }`}
                            >
                                <div className="md:h-[50%]" />
                                <Component
                                    {...pageProps}
                                />
                                <div className="md:h-[50%]" />
                            </main>
                        </div>
                    </div>
                </ConnectKitProvider>
            </WagmiConfig>
        </div>
    );
};

export default MyApp;
