import React from "react";
import TWAMMWidget from "../components/Swap";
import { Theme } from "../theme";
import { TokenTypes } from "../types/TokenOption";
import { darkTheme } from "../theme/defaultThemes";

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

//const fontUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Red+Hat+Mono:wght@700&display=swap"
const fontUrl = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Hat+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap";

function Home() {
  return (
    <div className="w-full flex items-center justify-center">
      <TWAMMWidget
          theme={theme}
          width="26.5rem"
          fontUrl={fontUrl}
      />
    </div>
  )
}

export default Home;
