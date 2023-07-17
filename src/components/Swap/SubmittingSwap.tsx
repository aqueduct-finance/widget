import { Theme } from "../../theme";
import { defaultTheme } from '../../theme/theme'
import React from "react";
import { GridCircleLoader } from "../../theme/loaders";

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
        <GridCircleLoader swapTheme={swapTheme} />
      </div>
      <div className="w-full text-white text-2xl flex justify-center items-center font-semibold">
        <h1>Submitting transaction</h1>
      </div>
    </div>
  )
}

export default SubmittingSwap;
