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
    outgoingFlowRate
}: DataDisplayProps) => {

    const store = useStore();

    return (
        <div className={`${isEntered ? 'h-[115px]' : 'h-0'} delay-200 px-4 ease-in-out duration-300 overflow-hidden`}
            style={{
                backgroundColor: swapTheme.streamLengthBox,
                borderRadius: swapTheme.secondaryBorderRadius
            }}
        >
            <div className={`${isEntered ? 'flex flex-col h-[105px]' : 'h-0'} delay-200 ease-in-out duration-300 w-full px-6 py-4 items-start text-xs space-y-3`}
                style={{
                    backgroundColor: swapTheme.dataDisplayBg,
                    color: swapTheme.accentText,
                    borderRadius: swapTheme.secondaryBorderRadius
                }}
            >
                <div className="flex flex-row space-x-5">
                    <p>Start Date:</p>
                    <p className="opacity-75"
                        style={{
                            color: swapTheme.primaryText
                        }}
                    >{startDate}
                        <span style={{ marginRight: '10px' }}></span>
                        {startTime}</p>
                </div>
                <div className="flex flex-row space-x-5">
                    <p>End Date:</p>
                    <p className="opacity-75"
                        style={{
                            color: swapTheme.primaryText
                        }}
                    >{endDate}
                        <span style={{ marginRight: '10px' }}></span>
                        {endTime}</p>
                </div>
                <div className="flex flex-row space-x-5">
                    <p>{store.outboundToken?.symbol} Flowrate: </p>
                    <p className="opacity-75"
                        style={{
                            color: swapTheme.primaryText
                        }}
                    >-{outgoingFlowRate.toFixed(8)} / sec</p>
                </div>
            </div>
        </div>
    )
}

export default DataDisplay;