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
            className={`absolute pt-6 bottom-[0.4rem] left-[0.4rem] right-[0.4rem] z-50 bg-darkGray/75 backdrop-blur-3xl transition-all rounded-[2.5rem] duration-300 ${showModal
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