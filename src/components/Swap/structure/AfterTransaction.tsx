import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Theme } from "../../../theme";
import TransactionSuccess from "./TransactionSuccess";
import TransactionFailed from "./TransactionFailed";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";

interface AfterTransactionProps {
    swapTheme: Theme;
    isSwapSuccess: boolean;
    isSwapFinished: boolean;
    setSwapActive: (value: boolean) => void;
    setIsApproved: (value: boolean) => void;
    setIsBufferAccepted: (value: boolean) => void;
    setIsSwapFinished: (value: boolean) => void;
    outgoingFlowRate: number;
    endDate: string;
    setSwapAmount: (value: number) => void;
    tx: string;
    endFlow: GenericDropdownOption;
}

const AfterTransaction = ({
    swapTheme,
    isSwapFinished,
    isSwapSuccess,
    setSwapActive,
    setIsApproved,
    setIsBufferAccepted,
    setIsSwapFinished,
    outgoingFlowRate,
    setSwapAmount,
    tx,
    endFlow
}: AfterTransactionProps) => {
    const [isExitHover, setIsExitHover] = useState(false);

    return (
        <div
            className={`absolute bottom-0 left-0 right-0 z-50 bg-black transition-all rounded-[3rem] overflow-hidden ${isSwapFinished
                ? "top-0 pointer-events-auto"
                : "top-full pointer-events-none"
                }`}
            style={{
                transitionDuration: swapTheme.primaryDuration
            }}
        >
            <div className={`${isSwapFinished ? ' flex' : 'hidden'} flex-col w-full h-full items-center justify-start ease-in-out rounded-[2rem] p-5`}
                style={{
                    transitionDuration: swapTheme.primaryDuration
                }}
            >
                <div className="w-full flex flex-row items-center justify-end px-3 text-2xl"
                    style={{
                        color: swapTheme.icons,
                        fontWeight: swapTheme.accentFontWeight
                    }}
                >
                    <IoMdClose className="text-3xl mt-3 cursor-pointer ease-in-out"
                        onMouseEnter={() => {
                            setIsExitHover(true)
                        }}
                        onMouseLeave={() => {
                            setIsExitHover(false)
                        }}
                        style={{
                            color: isExitHover ? swapTheme.accentText : swapTheme.primaryText,
                            transitionDuration: swapTheme.secondaryDuration
                        }}
                        onClick={() => {
                            setSwapActive(false)
                            setIsBufferAccepted(false)
                            setIsApproved(false)
                            setIsSwapFinished(false)
                            setSwapAmount(0)
                        }}
                    />
                </div>
                {isSwapSuccess ? (
                    <TransactionSuccess
                        swapTheme={swapTheme}
                        outgoingFlowRate={outgoingFlowRate}
                        tx={tx}
                        endFlow={endFlow}
                    />
                ) : (
                    <TransactionFailed
                        swapTheme={swapTheme}
                        setSwapActive={setSwapActive}
                        setIsApproved={setIsApproved}
                        setIsBufferAccepted={setIsBufferAccepted}
                        setIsSwapFinished={setIsSwapFinished}
                    />
                )}
            </div>
        </div>
    )
}

export default AfterTransaction;