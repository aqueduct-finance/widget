import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React, { useState } from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { IoMdClose } from 'react-icons/io'
import { TokenTypes } from "../../../types/TokenOption";
import ApproveRow from "./ApproveRow";
import { BsCheckLg } from 'react-icons/bs'
import { SwapText } from "../../../theme/animation";
import { useStore } from "../../../store";

interface ApproveSwapProps {
    flowrateUnit: GenericDropdownOption;
    flowrate: number;
    theme: Theme;
    outboundToken: TokenTypes | undefined;
    inboundToken: TokenTypes | undefined;
    swapAmount: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    autoWrap: boolean;
    swapActive: boolean;
    setSwapActive: (value: boolean) => void;
    isBufferAccepted: boolean;
    setIsBufferAccepted: (value: boolean) => void;
    isApproved: boolean;
    setIsApproved: (value: boolean) => void;
    buffer: number;
}

const Approve = ({
    flowrateUnit,
    flowrate,
    theme,
    outboundToken,
    inboundToken,
    swapAmount,
    startDate,
    startTime,
    endDate,
    endTime,
    autoWrap,
    swapActive,
    setSwapActive,
    isBufferAccepted,
    setIsBufferAccepted,
    isApproved,
    setIsApproved,
    buffer,
}: ApproveSwapProps) => {
    const [isExitHover, setIsExitHover] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false)

    const store = useStore()

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const options = [
        { title: "Spending", data: swapAmount + " " + outboundToken?.name },
        { title: "Receiving", data: inboundToken?.name },
        { title: "Flowrate", data: flowrate.toFixed(8) + " / " + flowrateUnit.sublabel },
        { title: "Start Date", data: startDate },
        { title: "Start Time", data: startTime },
        { title: "End Date", data: endDate },
        { title: "End Time", data: endTime },
        { title: "Auto Wrap", data: autoWrap ? "On" : "Off" },
    ]

    const filteredOptions = options.filter(
        (option) =>
            !(
                (option.title === "End Date" && option.data === "Not scheduled") ||
                (option.title === "End Time" && option.data === "")
            )
    );

    const handleApproveClick = () => {
        if (isBufferAccepted) {
            setIsApproved(true)
        } else {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 600);
        }
    };

    return (
        <div className={`${swapActive ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out duration-300 rounded-[3rem] px-4`}>
            <div className="w-full flex flex-row items-center justify-between px-3 font-bold text-2xl text-white">
                <h1>Approve Swap</h1>
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
                        setIsBufferAccepted(false)
                    }}
                />
            </div>
            <div className="w-full h-full rounded-lg flex flex-col items-center justify-center space-y-0 px-2 py-4">
                <div className="w-full flex flex-col space-y-8 px-3 py-6 rounded-xl ease-in-out duration-200"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <div className="w-full flex flex-col space-y-3 px-3 py-0 rounded-xl"
                    >
                        {filteredOptions.map((option, index) => (
                            <ApproveRow
                                item={option}
                                index={index}
                                swapTheme={swapTheme}
                                key={index}
                            />
                        ))}
                    </div>
                    <div className="w-full flex flex-col justify-start items-start py-4 px-4 rounded-xl space-y-4 leading-relaxed"
                        style={{
                            backgroundColor: isBufferAccepted ? swapTheme.secondaryMain : swapTheme.useMaxButton,
                        }}
                    >
                        <p
                            className="opacity-90"
                            style={{
                                color: swapTheme.primaryText,
                            }}
                        >If you do not cancel your swap before your balance reaches zero, you will lose your {buffer.toFixed(5)} {store.outboundToken?.underlyingToken?.symbol} buffer.</p>
                        <div className="flex flex-row space-x-2 items-center font-bold">
                            <button
                                className="w-[25px] h-[25px] rounded-md border-[1px] focus:outline-none ease-in-out duration-300"
                                style={{
                                    backgroundColor: isBufferAccepted ? "white" : "transparent",
                                    borderColor: "white"
                                }}
                                onClick={() => {
                                    setIsBufferAccepted(!isBufferAccepted)
                                }}
                            >
                                {isBufferAccepted && <BsCheckLg style={{ color: swapTheme.swapButton }} className="w-full h-full" />}
                            </button>
                            <p
                                className="font-bold opacity-80"
                                style={{
                                    color: swapTheme.primaryText
                                }}
                            >Yes, I understand the risk.</p>
                        </div>
                    </div>
                </div>
                <button className={`${isBufferAccepted ? '' : 'opacity-60'} font-semibold 2rounded-gc-2xl w-full rounded-full mt-4 ease-in-out duration-300`}
                    onClick={handleApproveClick}
                    style={{
                        backgroundColor: swapTheme.swapButton,
                        color: swapTheme.swapButtonText,
                        fontSize: swapTheme.swapButtonFontSize,
                        padding: swapTheme.swapButtonPadding
                    }}>
                    <SwapText swapTheme={swapTheme} showAnimation={showAnimation}>Approve</SwapText>
                </button>
            </div>
        </div>
    )
}

export default Approve;