import { Theme } from "../../theme";
import { defaultTheme } from '../../theme/theme'
import React, { useEffect, useState } from "react";
import { GenericDropdownOption } from "../../types/GenericDropdownOption";
import { TokenTypes } from "../../types/TokenOption";
import styled, { keyframes } from "styled-components";
import { IoMdClose } from 'react-icons/io'
import { useStore } from "../../store";
import flowrates from "../../utils/flowrates";

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotationBackAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const StyledLoader = styled.div<{ swapTheme: any }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid;
  border-color: ${({ swapTheme }) => swapTheme.swapButton} ${({ swapTheme }) => swapTheme.swapButton} transparent;
  box-sizing: border-box;
  animation: ${rotationAnimation} 1.5s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 10px solid;
    border-color: transparent ${({ swapTheme }) => swapTheme.accentText} ${({ swapTheme }) => swapTheme.accentText};
    width: 75px;
    height: 75px;
    border-radius: 50%;
    animation: ${rotationBackAnimation} 0.7s linear infinite;
    transform-origin: center center;
  }
}
`;

interface SwapResultProps {
  theme: Theme;
  swapActive: boolean;
  setSwapActive: (value: boolean) => void;
  setIsApproved: (value: boolean) => void;
  setIsBufferAccepted: (value: boolean) => void;
  setIsSwapSuccess: (value: boolean) => void;
  setIsSwapFinished: (value: boolean) => void;
}

const SwapResult = ({
  theme,
  swapActive,
  setSwapActive,
  setIsApproved,
  setIsBufferAccepted,
  setIsSwapSuccess,
  setIsSwapFinished,
}: SwapResultProps) => {
  const [dots, setDots] = useState('');
  const [isExitHover, setIsExitHover] = useState(false);

  const store = useStore()

  useEffect(() => {
    const delayLoading = () => {
      setTimeout(() => {
        store.setFlowrateUnit(flowrates[1])
        store.setOutboundToken(undefined)
        store.setInboundToken(undefined)
        setIsSwapSuccess(true)
        setIsSwapFinished(true)
      }, 5000);
    };

    delayLoading();
  }, []);

  useEffect(() => {
    const addDot = () => {
      if (dots === '...') {
        setDots('');
      } else {
        setDots(prevDots => prevDots + '.');
      }
    };

    const interval = setInterval(addDot, 300);

    return () => clearInterval(interval);
  }, [dots]);

  const swapTheme: Theme = { ...defaultTheme, ...theme };

  return (
    <div className={`${swapActive ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out duration-300 rounded-[2rem] px-4`}
      onClick={() => {
        setSwapActive(false)
        setIsApproved(false)
        setIsBufferAccepted(false)
      }}
    >
      <div className="w-full flex flex-row items-end justify-end px-3 font-bold text-2xl text-white">
        <IoMdClose className="text-3xl cursor-pointer ease-in-out duration-100"
          onMouseEnter={() => {
            setIsExitHover(true)
          }}
          onMouseLeave={() => {
            setIsExitHover(false)
          }}
          style={{ color: isExitHover ? swapTheme.accentText : swapTheme.primaryText }}
          onClick={() => {
            setSwapActive(false)
          }}
        />
      </div>
      <div className="w-full flex items-center justify-center px-3 py-3 mt-[35%]">
        <StyledLoader swapTheme={swapTheme} />
      </div>
      <div className="w-full text-white text-2xl flex justify-center items-center font-bold mt-12">
        <h1 className="ml-2">Processing transaction</h1>
        <div className="w-[10px]">{dots}</div>
      </div>
    </div>
  )
}

export default SwapResult;
