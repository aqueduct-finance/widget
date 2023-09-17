import TWAMMWidget from "aqueduct-widget";
//import { Theme } from "../../widget/dist/theme";
import { darkTheme } from "aqueduct-widget";

const theme = {
  ...darkTheme,
  TitleColor: "#FFFFFF",
}

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center">
      <TWAMMWidget
          theme={theme}
      />
    </div>
  )
}
