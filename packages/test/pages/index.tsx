import TWAMMWidget from "../../widget/src/components/Swap/index.tsx";
import { Theme } from "../../widget/src/theme";
import { darkTheme } from "../../widget/src/theme/defaultThemes";

const theme: Theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
}

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center">
      <TWAMMWidget
          theme={theme}
          width="26.5rem"
      />
    </div>
  )
}
