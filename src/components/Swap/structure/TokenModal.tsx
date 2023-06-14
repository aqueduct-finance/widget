import TokenDisplay from "./TokenDisplay";
import { Theme } from "../../../theme";
import { TokenTypes } from "../../../types/TokenOption";
import { useStore } from "../../../store";
import React from "react";

interface TokenModalProviderProps {
    tokenList?: TokenTypes[];
    showModal: boolean;
    theme?: Theme;
    setShowModal: (value: boolean) => void;
    outbound: boolean;
}


const TokenModalProvider = ({
    tokenList,
    showModal,
    setShowModal,
    outbound,
}: TokenModalProviderProps) => {

    const store = useStore()

    return (
        <div
            className={`absolute bottom-0 left-0 right-0 z-50 bg-black transition-all rounded-[2rem] duration-300 ${showModal
                ? "top-0 pointer-events-auto"
                : "top-full pointer-events-none"
                }`}
        >
            <TokenDisplay
                tokenOption={tokenList}
                display={showModal}
                setDisplay={setShowModal}
                setOutboundToken={store.setOutboundToken}
                setInboundToken={store.setInboundToken}
                outbound={outbound}
            />
        </div>
    )
}

export default TokenModalProvider;