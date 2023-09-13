import React from "react";
import { Theme } from "../../../theme";
import StreamLength from "./StreamLength";
import { useStore } from "../../../store";

interface StreamLengthContainerProps {
    swapTheme: Theme;
}

const StreamLengthContainer = ({
    swapTheme,
}: StreamLengthContainerProps) => {
    const store = useStore();

    return (
        <div
            className={`${
                store.flowrateUnit?.label === "Total Amount" ? "mt-2" : "mt-0"
            } w-full bg-transparent`}
            style={{
                borderRadius: swapTheme.accentBorderRadius,
            }}
        >
            {store.flowrateUnit?.label === "Total Amount" ? (
                <div className="flex flex-row justify-between">
                    <StreamLength
                        theme={swapTheme}
                    />
                </div>
            ) : (
                <div />
            )}
        </div>
    );
};

export default StreamLengthContainer;
