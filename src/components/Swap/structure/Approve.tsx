import { Theme } from "../../../theme";
import { defaultTheme } from "../../../theme/theme";
import React, { useState } from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { IoMdClose } from "react-icons/io";
import { TokenTypes } from "../../../types/TokenOption";
import ApproveRow from "./ApproveRow";
import { BsCheckLg } from "react-icons/bs";
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
    const [showAnimation, setShowAnimation] = useState(false);

    const store = useStore();

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const options = [
        { title: "Spending", data: swapAmount + " " + outboundToken?.symbol },
        { title: "Receiving", data: inboundToken?.symbol },
        {
            title: "Flowrate",
            data: flowrate.toFixed(8) + " / " + flowrateUnit.sublabel,
        },
        { title: "Start Date", data: startDate },
        { title: "Start Time", data: startTime },
        { title: "End Date", data: endDate },
        { title: "End Time", data: endTime },
        { title: "Auto Wrap", data: autoWrap ? "On" : "Off" },
    ];

    const filteredOptions = options.filter(
        (option) =>
            !(
                (option.title === "End Date" &&
                    option.data === "Not scheduled") ||
                (option.title === "End Time" && option.data === "")
            )
    );

    const handleApproveClick = () => {
        if (isBufferAccepted) {
            setIsApproved(true);
        } else {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 600);
        }
    };

    return (
        <div
            className={`${
                swapActive ? " flex" : "hidden"
            } flex-col w-full h-full items-start justify-start ease-in-out rounded-[3rem] px-4`}
            style={{
                transitionDuration: swapTheme.primaryDuration,
            }}
        >
            <div
                className="w-full flex flex-row items-center justify-between px-3 text-2xl"
                style={{
                    color: swapTheme.TitleColor,
                    fontWeight: swapTheme.accentFontWeight,
                }}
            >
                <h1>Approve Swap</h1>
                <IoMdClose
                    className="text-3xl cursor-pointer ease-in-out"
                    onMouseEnter={() => {
                        setIsExitHover(true);
                    }}
                    onMouseLeave={() => {
                        setIsExitHover(false);
                    }}
                    style={{
                        color: isExitHover
                            ? swapTheme.accentText
                            : swapTheme.primaryText,
                        transitionDuration: swapTheme.secondaryDuration,
                    }}
                    onClick={() => {
                        setSwapActive(false);
                        setIsBufferAccepted(false);
                    }}
                />
            </div>
            <div
                className="w-full h-full flex flex-col items-center justify-between space-y-0 px-2 pt-4 pb-5"
                style={{
                    borderRadius: swapTheme.accentBorderRadius,
                }}
            >
                <div
                    className="w-full flex flex-col space-y-9 px-3 pt-6 pb-0 ease-in-out duration-200 mt-8"
                    style={{
                        backgroundColor: "transparent",
                        borderRadius: swapTheme.accentBorderRadius,
                    }}
                >
                    <div
                        className="w-full flex flex-col space-y-3 px-3 py-0"
                        style={{
                            borderRadius: swapTheme.accentBorderRadius,
                        }}
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
                    <div
                        className="w-full flex flex-col justify-start items-start py-4 px-4 space-y-4 leading-relaxed"
                        style={{
                            backgroundColor: isBufferAccepted
                                ? swapTheme.secondaryMain
                                : swapTheme.useMaxButton,
                            borderRadius: swapTheme.accentBorderRadius,
                        }}
                    >
                        <p
                            className="opacity-90"
                            style={{
                                color: swapTheme.primaryText,
                            }}
                        >
                            If you do not cancel your swap before your balance
                            reaches zero, you will lose your {buffer.toFixed(5)}{" "}
                            {store.outboundToken?.underlyingToken?.symbol}{" "}
                            buffer.
                        </p>
                        <div className="flex flex-row space-x-2 items-center font-bold">
                            <button
                                className="w-[25px] h-[25px] border-[1px] focus:outline-none ease-in-out"
                                style={{
                                    backgroundColor: isBufferAccepted
                                        ? "white"
                                        : "transparent",
                                    borderColor: "white",
                                    borderRadius: swapTheme.checkBorderRadius,
                                    transitionDuration:
                                        swapTheme.primaryDuration,
                                }}
                                onClick={() => {
                                    setIsBufferAccepted(!isBufferAccepted);
                                }}
                            >
                                {isBufferAccepted && (
                                    <BsCheckLg
                                        style={{ color: swapTheme.swapButton }}
                                        className="w-full h-full"
                                    />
                                )}
                            </button>
                            <p
                                className="opacity-80"
                                style={{
                                    color: swapTheme.primaryText,
                                    fontWeight: swapTheme.accentFontWeight,
                                }}
                            >
                                Yes, I understand the risk.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    className={`${
                        isBufferAccepted ? "" : "opacity-60"
                    } w-full mt-4 ease-in-out`}
                    onClick={handleApproveClick}
                    style={{
                        backgroundColor: swapTheme.swapButton,
                        color: swapTheme.swapButtonText,
                        fontSize: swapTheme.swapButtonFontSize,
                        padding: swapTheme.swapButtonPadding,
                        fontWeight: swapTheme.secondaryFontWeight,
                        borderRadius: swapTheme.itemBorderRadius,
                        transitionDuration: swapTheme.primaryDuration,
                    }}
                >
                    <SwapText
                        swapTheme={swapTheme}
                        showAnimation={showAnimation}
                    >
                        Approve
                    </SwapText>
                </button>
            </div>
        </div>
    );
};

export default Approve;
