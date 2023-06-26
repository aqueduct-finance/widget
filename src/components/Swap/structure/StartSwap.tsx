import { useStore } from "../../../store";
import { Theme } from "../../../theme";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { TokenTypes } from "../../../types/TokenOption";
import SwapResult from "../Result";
import Approve from "./Approve";
import React from "react";

interface StartSwapProps {
    flowrateUnit: GenericDropdownOption;
    theme: Theme;
    outboundToken: TokenTypes | undefined;
    inboundToken: TokenTypes | undefined;
    swapAmount: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    swapActive: boolean;
    setSwapActive: (value: boolean) => void;
    setIsApproved: (value: boolean) => void;
    setIsBufferAccepted: (value: boolean) => void;
    isBufferAccepted: boolean;
    isApproved: boolean;
    autoWrap: boolean;
    outgoingFlowRate: number;
    buffer: number;
    setIsSwapSuccess: (value: boolean) => void;
    setIsSwapFinished: (value: boolean) => void;
}

const StartSwap = ({
    theme,
    swapAmount,
    startDate,
    startTime,
    endDate,
    endTime,
    swapActive,
    setSwapActive,
    setIsApproved,
    setIsBufferAccepted,
    isBufferAccepted,
    isApproved,
    autoWrap,
    outgoingFlowRate,
    buffer,
    setIsSwapSuccess,
    setIsSwapFinished,
}: StartSwapProps) => {
    const store = useStore();

    return (
        <div
            className={`absolute bottom-[0.2rem] left-0 right-0 z-50 transition-all rounded-[2rem] overflow-hidden ${
                swapActive
                    ? "top-0 pointer-events-auto"
                    : "top-full pointer-events-none"
            }`}
            style={{
                backgroundColor: theme.bgColor,
                transitionDuration: theme.primaryDuration,
            }}
        >
            {isApproved ? (
                <SwapResult
                    theme={theme}
                    swapActive={swapActive}
                    setSwapActive={setSwapActive}
                    setIsApproved={setIsApproved}
                    setIsBufferAccepted={setIsBufferAccepted}
                    setIsSwapSuccess={setIsSwapSuccess}
                    setIsSwapFinished={setIsSwapFinished}
                />
            ) : (
                <Approve
                    flowrateUnit={store.flowrateUnit}
                    flowrate={outgoingFlowRate}
                    theme={theme}
                    outboundToken={store.outboundToken}
                    inboundToken={store.inboundToken}
                    swapAmount={swapAmount}
                    startDate={startDate}
                    startTime={startTime}
                    endDate={endDate}
                    endTime={endTime}
                    autoWrap={autoWrap}
                    swapActive={swapActive}
                    setSwapActive={setSwapActive}
                    isBufferAccepted={isBufferAccepted}
                    setIsBufferAccepted={setIsBufferAccepted}
                    isApproved={isApproved}
                    setIsApproved={setIsApproved}
                    buffer={buffer}
                />
            )}
        </div>
    );
};

export default StartSwap;
