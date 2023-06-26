import React from "react";
import { Theme } from "../../../theme";
import StreamLength from "./StreamLength";
import { useStore } from "../../../store";

interface StreamLengthContainerProps {
    swapTheme: Theme;
    length: number;
    setLength: (value: number) => void;
}

const StreamLengthContainer = ({
    swapTheme,
    setLength,
    length,
}: StreamLengthContainerProps) => {
    const store = useStore();

    return (
        <div
            className={`${
                store.flowrateUnit?.label === "Pay Once" ? "mt-2" : "mt-0"
            } w-full bg-transparent`}
            style={{
                borderRadius: swapTheme.accentBorderRadius,
            }}
        >
            {store.flowrateUnit?.label === "Pay Once" ? (
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
    );
};

export default StreamLengthContainer;
