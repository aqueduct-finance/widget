import React from "react"
import TWAMMWidget from "../components/Swap"
import { Theme } from "../theme"
import { TokenTypes } from "../types/TokenOption"
import { darkTheme } from "../theme/defaultThemes"

// This file is for testing, actual 'index.tsx' will just export the component

const theme: Theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
  swapButton: "#E17BF7",
  primaryBorderRadius: '3rem',
  secondaryBorderRadius: '0.9rem',
  swapButtonPadding: '0.75rem'
}

const tokens: TokenTypes[] = [
  {
    name: "Shiba Inu",
    address: "0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec",
    symbol: "SHIB",
    decimals: 18,
    chainId: 137,
    logoURI: "/shiba.png"
  },
];


function Home() {
  return (
    <div>
      <TWAMMWidget theme={theme} tokenOption={tokens} defaultTokens={true} Web3Key={process.env.NEXT_PUBLIC_ALCHEMY_KEY} />
    </div>
  )
}

export default Home;
