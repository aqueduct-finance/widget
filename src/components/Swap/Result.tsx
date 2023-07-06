import { Theme } from "../../theme";
import { defaultTheme } from '../../theme/theme'
import React from "react";
import { GridCircleLoader } from "../../theme/loaders";

interface SwapResultProps {
  theme: Theme;
  swapActive: boolean;
  setSwapActive: (value: boolean) => void;
  setIsApproved: (value: boolean) => void;
  setIsBufferAccepted: (value: boolean) => void;
}

const SwapResult = ({
  theme,
  swapActive,
  setSwapActive,
  setIsApproved,
  setIsBufferAccepted,
}: SwapResultProps) => {
  const swapTheme: Theme = { ...defaultTheme, ...theme };

  return (
    <div className={`${swapActive ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out duration-300 rounded-[2rem] px-4`}
      onClick={() => {
        setSwapActive(false)
        setIsApproved(false)
        setIsBufferAccepted(false)
      }}
    >
      <div className="w-full flex items-center justify-center px-3 py-3 mt-[35%]">
        <GridCircleLoader swapTheme={swapTheme} />
      </div>
      <div className="w-full text-white text-2xl flex justify-center items-center font-bold mt-12">
        <h1 className="ml-2">Submitting transaction</h1>
      </div>
    </div>
  )
}

export default SwapResult;
