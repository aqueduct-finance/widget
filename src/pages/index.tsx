import React from "react";
import TWAMMWidget from "../components/Swap";
import { Theme } from "../theme";
import { darkTheme } from "../theme/defaultThemes";

const theme: Theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
}

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
