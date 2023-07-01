import { create } from "zustand";
import { GenericDropdownOption } from "./types/GenericDropdownOption";
import Token from "./types/Token";
import { TokenOption, TokenTypes } from "./types/TokenOption";
import flowrates from "./utils/flowrates";
import tokens from "./utils/tokens";

interface StoreState {
    outboundToken: TokenTypes | undefined;
    inboundToken: TokenTypes | undefined;
    upgradeDowngradeToken: TokenOption;
    selectedToken: Token;
    flowrateUnit: GenericDropdownOption;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    setUpgradeDowngradeToken: (token: TokenOption) => void;
    setSelectedToken: (token: Token) => void;
    setFlowrateUnit: (flowrateUnit: GenericDropdownOption) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useStore = create<StoreState>()((set) => ({
    outboundToken: undefined, // tokens.find((t) => t.value === Token.fDAIxp)!,
    inboundToken: undefined, // tokens.find((t) => t.value === Token.fUSDCxp)!,
    upgradeDowngradeToken: tokens.find((t) => t.value === Token.fDAIxp)!,
    selectedToken: Token.fDAIxp,
    flowrateUnit: flowrates[0],
    setOutboundToken: (outboundToken: TokenTypes) =>
        set((state) => ({ ...state, outboundToken })),
    setInboundToken: (inboundToken: TokenTypes) =>
        set((state) => ({ ...state, inboundToken })),
    setUpgradeDowngradeToken: (upgradeDowngradeToken: TokenOption) =>
        set((state) => ({ ...state, upgradeDowngradeToken })),
    setSelectedToken: (selectedToken: Token) =>
        set((state) => ({ ...state, selectedToken })),
    setFlowrateUnit: (flowrateUnit: GenericDropdownOption) =>
        set((state) => ({ ...state, flowrateUnit })),
}));
