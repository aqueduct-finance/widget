import { Theme } from "../../theme";
import { defaultTheme } from '../../theme/theme'
import React from "react";
//import { GridCircleLoader } from "../../theme/loaders";

interface SubmittingSwapProps {
  theme: Theme;
}

const SubmittingSwap = ({
  theme
}: SubmittingSwapProps) => {
  const swapTheme: Theme = { ...defaultTheme, ...theme };

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full duration-300 px-4 pt-32 pb-40`}>
      <div className="w-full flex items-center justify-center h-40">
        {/*<GridCircleLoader swapTheme={swapTheme} />*/}
        <div
            className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
            style={{borderLeftColor: swapTheme.swapButton, borderTopColor: swapTheme.swapButton, borderBottomColor: swapTheme.swapButton}}
            role="status"
        />
      </div>
      <div className="w-full text-white text-2xl flex justify-center items-center font-semibold">
        <h1>Submitting transaction</h1>
      </div>
    </div>
  )
}

export default SubmittingSwap;
