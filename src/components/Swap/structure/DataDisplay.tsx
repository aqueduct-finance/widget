import React from "react";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";

interface DataDisplayProps {
    swapTheme: Theme;
    isShown: boolean;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    outgoingFlowRate: number;
}

const DataDisplay = ({
    swapTheme,
    isShown,
    startDate,
    startTime,
    endDate,
    endTime,
    outgoingFlowRate,
}: DataDisplayProps) => {
    const store = useStore();

    return (
        <div className={`${isShown ? ' max-h-[8rem] p-1.5' : 'max-h-0'} delay-200 ease-in-out overflow-hidden `}
            style={{
                backgroundColor: swapTheme.streamLengthBox,
                borderRadius: swapTheme.secondaryBorderRadius,
                transitionDuration: swapTheme.primaryDuration,
                fontFamily: swapTheme.textFont,
            }}
        >
            <div className={` delay-200 ease-in-out w-full px-6 py-4 items-start text-xs space-y-3 `}
                style={{
                    backgroundColor: swapTheme.dataDisplayBg,
                    color: swapTheme.accentText,
                    borderRadius: `calc(${swapTheme.secondaryBorderRadius} - 0.375rem`
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
                        <span style={{ marginRight: "10px" }}></span>
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
                        <span style={{ marginRight: "10px" }}></span>
                        {endTime}
                    </p>
                </div>
                <div className="flex flex-row space-x-5">
                    <p>{store.outboundToken?.symbol} Flowrate: </p>
                    <p
                        className="opacity-75"
                        style={{
                            color: swapTheme.primaryText,
                        }}
                    >-{isNaN(outgoingFlowRate) ? "0.0" : outgoingFlowRate.toFixed(8)} / sec</p>
                </div>
            </div>
        </div>
    );
};

export default DataDisplay;
