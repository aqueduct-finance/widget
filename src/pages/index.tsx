import React from "react"
import SwapWidget from "../components/Swap"
import { Theme } from "../theme"
import { TokenTypes } from "../types/TokenOption"

// This file is for testing, actual 'index.tsx' will just export the component

const theme: Theme = {
  TitleColor: "#FFFFFF",
  swapButton: "#E17BF7"
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


export default function Home() {
  return (
    <div>
      <SwapWidget tokenOption={tokens} theme={theme} defaultTokens={true} />
    </div>
  )
}
