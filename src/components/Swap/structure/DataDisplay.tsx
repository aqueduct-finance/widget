import React from "react";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface DataDisplayProps {
    swapTheme: Theme;
    isEntered: boolean;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    outgoingFlowRate: number;
}

const DataDisplay = ({
    swapTheme,
    isEntered,
    startDate,
    startTime,
    endDate,
    endTime,
    outgoingFlowRate,
}: DataDisplayProps) => {
    const { outboundToken } = useStore();

    return (
        <div
            className={`${
                isEntered ? "h-[110px]" : "h-0"
            } delay-200 px-1.5 ease-in-out overflow-hidden`}
            style={{
                backgroundColor: swapTheme.streamLengthBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.primaryDuration,
                fontFamily: swapTheme.textFont,
            }}
        >
            <div
                className={`${
                    isEntered ? "flex flex-col h-[105px]" : "h-0"
                } delay-200 ease-in-out w-full px-6 py-4 items-start text-xs space-y-3`}
                style={{
                    backgroundColor: swapTheme.dataDisplayBg,
                    color: swapTheme.accentText,
                    borderRadius: swapTheme.secondaryBorderRadius,
                    transitionDuration: swapTheme.primaryDuration,
                }}
            >
                <div className="flex flex-row space-x-5">
                    <p>Start Date:</p>
                    <p
                        className="opacity-75"
                        style={{
                            color: swapTheme.primaryText,
                        }}
                    >
                        {startDate}
                        <span style={{ marginRight: "10px" }} />
                        {startTime}
                    </p>
                </div>
                <div className="flex flex-row space-x-5">
                    <p>End Date:</p>
                    <p
                        className="opacity-75"
                        style={{
                            color: swapTheme.primaryText,
                        }}
                    >
                        {endDate}
                        <span style={{ marginRight: "10px" }} />
                        {endTime}
                    </p>
                </div>
                <div className="flex flex-row space-x-5">
                    <p>{outboundToken?.symbol} Flowrate: </p>
                    <p
                        className="opacity-75"
                        style={{
                            color: swapTheme.primaryText,
                        }}
                    >
                        -
                        {Number.isNaN(outgoingFlowRate)
                            ? "0.0"
                            : outgoingFlowRate.toFixed(8)}{" "}
                        / sec
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DataDisplay;
