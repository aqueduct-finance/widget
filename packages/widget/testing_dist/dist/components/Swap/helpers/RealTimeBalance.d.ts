import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { TokenTypes } from "../../../types/TokenOption";
interface RealTimeBalanceProps {
    token: TokenTypes;
    setBalance: Dispatch<SetStateAction<BigNumber>>;
    balance: BigNumber | null;
    setunWrapped: Dispatch<SetStateAction<number>>;
    setIsNew: (value: boolean) => void;
    isNew: boolean;
}
declare const RealTimeBalance: ({ token, setBalance, balance, setunWrapped, setIsNew, isNew }: RealTimeBalanceProps) => import("react/jsx-runtime").JSX.Element;
export default RealTimeBalance;
