import React from "react";
import { Theme } from "../../../theme";
import StreamLength from "./StreamLength";

interface StreamLengthContainerProps {
    swapTheme: Theme;
    isPayOnce: boolean;
    length: number;
    setLength: (value: number) => void;
}

const StreamLengthContainer = ({
    swapTheme,
    isPayOnce,
    setLength,
    length,
}: StreamLengthContainerProps) => (
    <div className={`${isPayOnce ? 'mt-2' : 'mt-0'} w-full rounded-lg bg-transparent`}>
        {isPayOnce ? (
            <div className="flex flex-row justify-between">
                <StreamLength
                    theme={swapTheme}
                    setLength={setLength}
                    length={length}
                />
            </div>
        ) : (
            <div />
        )}
    </div>
)

export default StreamLengthContainer;