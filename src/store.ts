import { create } from "zustand";
import { GenericDropdownOption } from "./types/GenericDropdownOption";
import Token from "./types/Token";
import { TokenOption, TokenTypes } from "./types/TokenOption";
import flowrates from "./utils/flowrates";
import { DEFAULT_PAY_ONCE } from "./utils/constants";
import { CollapseState } from "./types/CollapseState";
import getErc20Contract from "./components/Swap/helpers/getErc20Contract";
import { getAccount } from '@wagmi/core'
import { decodeAllowanceRes } from "./components/Swap/helpers/decodeAllowanceRes";
import { decodeBalanceRes } from "./components/Swap/helpers/decodeBalanceRes";

interface StoreState {
    swapAmount: number;
    outboundToken: TokenTypes | undefined;
    inboundToken: TokenTypes | undefined;
    outboundTokenBalance: number;
    underlyingOutboundTokenBalance: number;
    underlyingOutboundTokenWrapperAllowance: number;
    inboundTokenBalance: number;
    underlyingInboundTokenBalance: number;
    flowrateUnit: GenericDropdownOption;
    collapseState: CollapseState;
    payOnceLength: number;
    lastSwapTx: string;
    setLastSwapTx: (lastSwapTx: string) => void;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    setOutboundTokenBalance: (outboundTokenBalance: number) => void;
    setUnderlyingOutboundTokenAllowance: (underlyingOutboundTokenAllowance: number) => void;
    setInboundTokenBalance: (outboundTokenBalance: number) => void;
    setUpgradeDowngradeToken: (token: TokenOption) => void;
    setSelectedToken: (token: Token) => void;
    setFlowrateUnit: (flowrateUnit: GenericDropdownOption) => void;
    setPayOnceLength: (value: number) => void;
    setSwapAmount: (amount: number) => void;

    setCollapseState: (collapseState: CollapseState) => void;

    incrementOutboundTokenBalance: (amount: number) => void;
    incrementInboundTokenBalance: (amount: number) => void;

    // helpers
    getEffectiveFlowRate: () => string;
    isBalanceUnderSwapAmount: () => boolean;
    isBalanceUnderBuffer: () => boolean;
    getExpectedDeposit: () => number;
    getAmountNeededToWrap: () => number;
    getAmountNeededToApproveForWrap: () => number;
    getCombinedOutboundBalance: () => number;
    getCombinedInboundBalance: () => number;
    getSwapAmountAsString: () => string;
    getSwapAmountAsLocaleString: () => string;
}

// eslint-disable-next-line import/prefer-default-export
export const useStore = create<StoreState>()((set, get) => ({
    swapAmount: 0,
    outboundToken: undefined, // tokens.find((t) => t.value === Token.fDAIxp)!,
    inboundToken: undefined, // tokens.find((t) => t.value === Token.fUSDCxp)!,
    outboundTokenBalance: 0,
    underlyingOutboundTokenBalance: 0,
    underlyingOutboundTokenWrapperAllowance: 0,
    inboundTokenBalance: 0,
    underlyingInboundTokenBalance: 0,
    flowrateUnit: flowrates[0],
    payOnceLength: DEFAULT_PAY_ONCE,
    collapseState: CollapseState.NONE,
    lastSwapTx: '',
    setLastSwapTx: (lastSwapTx: string) => 
        set((state) => ({...state, lastSwapTx })),
    setOutboundToken: async (outboundToken: TokenTypes) => {
        set((state) => ({ ...state, outboundToken }))

        // when token changes, fetch the underlying token balance and wrapper allowance
        const account = getAccount().address;
        if (!account || !outboundToken.underlyingToken) { return; }

        const erc20Contract = getErc20Contract(outboundToken.underlyingToken.address)
        if (!erc20Contract) { return; }

        const [balanceRes, allowanceRes] = await Promise.all([
            erc20Contract.read.balanceOf([account]),
            erc20Contract.read.allowance([account, outboundToken.address]),
        ]);
        const balance = decodeBalanceRes(balanceRes).balance;
        const allowance = decodeAllowanceRes(allowanceRes).allowance;
        set((state) => ({ ...state, underlyingOutboundTokenBalance: balance, underlyingOutboundTokenWrapperAllowance: allowance }));
    },
    setInboundToken: async (inboundToken: TokenTypes) => {
        set((state) => ({ ...state, inboundToken }))

        // when token changes, fetch the underlying token balance
        const account = getAccount().address;
        if (!account || !inboundToken.underlyingToken) { return; }

        const erc20Contract = getErc20Contract(inboundToken.underlyingToken.address)
        if (!erc20Contract) { return; }

        const [balanceRes] = await Promise.all([
            erc20Contract.read.balanceOf([account])
        ]);
        const balance = decodeBalanceRes(balanceRes).balance;
        set((state) => ({ ...state, underlyingInboundTokenBalance: balance }));
    },
    setOutboundTokenBalance: (outboundTokenBalance: number) =>
        set((state) => ({ ...state, outboundTokenBalance })),
    setUnderlyingOutboundTokenBalance: (underlyingOutboundTokenBalance: number) =>
        set((state) => ({ ...state, underlyingOutboundTokenBalance })),
    setUnderlyingOutboundTokenAllowance: (underlyingOutboundTokenAllowance: number) =>
        set((state) => ({ ...state, underlyingOutboundTokenAllowance })),
    setInboundTokenBalance: (inboundTokenBalance: number) =>
        set((state) => ({ ...state, inboundTokenBalance })),
    setUnderlyingInboundTokenBalance: (underlyingInboundTokenBalance: number) =>
        set((state) => ({ ...state, underlyingInboundTokenBalance })),
    setUpgradeDowngradeToken: (upgradeDowngradeToken: TokenOption) =>
        set((state) => ({ ...state, upgradeDowngradeToken })),
    setSelectedToken: (selectedToken: Token) =>
        set((state) => ({ ...state, selectedToken })),
    setFlowrateUnit: (flowrateUnit: GenericDropdownOption) =>
        set((state) => ({ ...state, flowrateUnit })),
    setPayOnceLength: (payOnceLength: number) =>
        set((state) => ({ ...state, payOnceLength })),
    setCollapseState: (collapseState: CollapseState) =>
        set((state) => ({ ...state, collapseState })),
    setSwapAmount: (swapAmount: number) =>
        set((state) => ({ ...state, swapAmount })),

    incrementOutboundTokenBalance: (amount: number) =>
        set((state) => ({ ...state, outboundTokenBalance: get().outboundTokenBalance + amount })),
    incrementInboundTokenBalance: (amount: number) =>
        set((state) => ({ ...state, inboundTokenBalance: get().inboundTokenBalance + amount })),

    // helper functions
    getEffectiveFlowRate: () => {
        const flowRate = get().flowrateUnit.sublabel == 'once' ? get().swapAmount / get().payOnceLength : get().swapAmount / get().flowrateUnit.value;
        return flowRate.toString();
    },
    isBalanceUnderSwapAmount: () => {
        //const formattedUnderlyingBalance = get().underlyingOutboundTokenBalance && underlyingOutBalance.data ? parseFloat(underlyingOutBalance.data.formatted) : 0;
        const combinedBalances = get().underlyingOutboundTokenBalance + get().outboundTokenBalance;

        // balance should be greater than 10 hours of streaming (based on computed flowrate)
        const minimumBalance = parseFloat(get().getEffectiveFlowRate()) * 36000;
        return minimumBalance > combinedBalances;
    },
    isBalanceUnderBuffer: () => {
        return (parseFloat(get().getEffectiveFlowRate()) * 3600 * 10) > get().outboundTokenBalance;
    },
    getExpectedDeposit: () => {
        return parseFloat(get().getEffectiveFlowRate()) * 3600 * 4;
    },
    getCombinedOutboundBalance: () => {
        return get().outboundTokenBalance + get().underlyingOutboundTokenBalance;
    },
    getAmountNeededToWrap: () => {
        // this should only be called if we know the user has enough combined balance

        // balance should be greater than 10 hours of streaming (based on computed flowrate)
        const minimumBalance = parseFloat(get().getEffectiveFlowRate()) * 36000;

        if (get().outboundTokenBalance > minimumBalance) { return 0; } 
        return minimumBalance - get().outboundTokenBalance;
    },
    getAmountNeededToApproveForWrap: () => {
        const amountNeededToWrap = get().getAmountNeededToWrap();
        const amountAlreadyApproved = get().underlyingOutboundTokenWrapperAllowance;
        const amountNeeded = amountNeededToWrap - amountAlreadyApproved;

        return amountNeeded > 0 ? amountNeeded : 0;
    },
    getCombinedInboundBalance: () => {
        return get().inboundTokenBalance + get().underlyingInboundTokenBalance;
    },
    getSwapAmountAsString: () => {
        const amount = parseFloat(get().swapAmount.toString());
        const decimalPlaces = (amount.toString().split('.')[1] || []).length;

        return decimalPlaces > 5 ? amount.toFixed(5) : amount.toString();
    },
    getSwapAmountAsLocaleString: () => {
        const amount = parseFloat(get().swapAmount.toString());
        return amount.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 5
        });
    }
})); 