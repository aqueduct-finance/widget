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
    setIsEntered: (value: boolean) => void;
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
    swapFlowRate: string;
    setTx: (value: string) => void;
    outBalance: number;
    setEndFlow: (value: GenericDropdownOption) => void;
}

const StartSwap = ({
    theme,
    swapAmount,
    setIsEntered,
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
                    setIsEntered={setIsEntered}
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
                    buffer={buffer}
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
