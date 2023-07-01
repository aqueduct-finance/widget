import React from "react";
import { useStore } from "../../../store";
import { Theme } from "../../../theme";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import SwapResult from "../Result";
import Approve from "./Approve";

interface StartSwapProps {
    theme: Theme;
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
    setIsSwapSuccess: (value: boolean) => void;
    setIsSwapFinished: (value: boolean) => void;
    swapFlowRate: string;
    setTx: (value: string) => void;
    outBalance: number;
    setEndFlow: (value: GenericDropdownOption) => void;
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
    setIsSwapSuccess,
    setIsSwapFinished,
    swapFlowRate,
    setTx,
    outBalance,
    setEndFlow,
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
                />
            ) : (
                <Approve
                    flowrateUnit={store.flowrateUnit}
                    flowrate={outgoingFlowRate}
                    theme={theme}
                    outboundToken={store.outboundToken}
                    inboundToken={store.inboundToken}
                    swapAmount={swapAmount}
                    setFlow={setEndFlow}
                    startDate={startDate}
                    startTime={startTime}
                    endDate={endDate}
                    endTime={endTime}
                    autoWrap={autoWrap}
                    swapActive={swapActive}
                    setSwapActive={setSwapActive}
                    isBufferAccepted={isBufferAccepted}
                    setIsBufferAccepted={setIsBufferAccepted}
                    setIsApproved={setIsApproved}
                    swapFlowRate={swapFlowRate}
                    setIsSwapFinished={setIsSwapFinished}
                    setIsSwapSuccess={setIsSwapSuccess}
                    setTx={setTx}
                    outBalance={outBalance}
                />
            )}
        </div>
    );
};

export default StartSwap;
