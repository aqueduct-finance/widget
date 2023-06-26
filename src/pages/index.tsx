import React from "react";
import TWAMMWidget from "../components/Swap";
import { Theme } from "../theme";
import { TokenTypes } from "../types/TokenOption";
import { darkTheme, lightTheme } from "../theme/defaultThemes";

const Web3Key = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const theme: Theme = {
    ...darkTheme,
    TitleColor: "#FFFFFF",
    swapButton: "#E17BF7",
};

const tokens: TokenTypes[] = [
    {
        name: "Shiba Inu",
        address: "0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec",
        symbol: "SHIB",
        decimals: 18,
        chainId: 5,
        logoURI: "/shiba.png",
    },
    {
        name: "Alongside Crypto Market Index",
        address: "0x322a06447Ff6FcF75d803135a7de15CE88C1d4ec",
        symbol: "AMKT",
        decimals: 18,
        chainId: 5,
        logoURI: "/alongside.png",
    },
];

const outboundToken = "0x3a36cD6D55e260E0a3448cd8905c51517bb7EbA8";

const inboundToken = "0x322a06447Ff6FcF75d803135a7de15CE88C1d4ec";

const fontUrl =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Red+Hat+Mono:wght@700&display=swap";

function Home() {
    return (
        <div>
            <TWAMMWidget
                Web3Key={Web3Key}
                theme={theme}
                tokenOption={tokens}
                width="27rem"
                outboundToken={outboundToken}
                inboundToken={inboundToken}
                fontUrl={fontUrl}
            />
        </div>
    );
}

export default Home;
