import React from "react"
import TWAMMWidget from "../components/Swap"
import { Theme } from "../theme"
import { TokenTypes } from "../types/TokenOption"
import { darkTheme, lightTheme } from "../theme/defaultThemes"

const Web3Key = process.env.NEXT_PUBLIC_ALCHEMY_KEY

const theme: Theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
}

const tokens: TokenTypes[] = [
  {
    name: "Shiba Inu",
    address: "0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec",
    symbol: "SHIB",
    decimals: 18,
    chainId: 5,
    logoURI: "/shiba.png"
  },
];

const fontUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Red+Hat+Mono:wght@700&display=swap"


function Home() {
  return (
    <div>
      <TWAMMWidget
          Web3Key={Web3Key}
          theme={theme}
          tokenOption={tokens}
          width="26.5rem"
          fontUrl={fontUrl}
      />
    </div>
  )
}

export default Home;