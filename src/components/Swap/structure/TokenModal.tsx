import React from "react";
import TokenDisplay from "./TokenDisplay";
import { Theme } from "../../../theme";
import { TokenTypes } from "../../../types/TokenOption";

interface TokenModalProviderProps {
    tokenList: TokenTypes[];
    showModal: boolean;
    theme: Theme;
    setShowModal: (value: boolean) => void;
    outbound: boolean;
}

const TokenModalProvider = ({
    tokenList,
    showModal,
    setShowModal,
    outbound,
    theme,
}: TokenModalProviderProps) => (
    <div
        className={`absolute bottom-[0.2rem] left-0 right-0 z-50 transition-all rounded-[2rem] ${
            showModal
                ? "top-0 pointer-events-auto"
                : "top-full pointer-events-none"
        }`}
        style={{
            backgroundColor: theme.bgColor,
            transitionDuration: theme.primaryDuration,
        }}
    >
        <TokenDisplay
            tokenOption={tokenList}
            theme={theme}
            display={showModal}
            setDisplay={setShowModal}
            outbound={outbound}
        />
    </div>
);

export default TokenModalProvider;
