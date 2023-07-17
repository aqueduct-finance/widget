import { ethers } from "ethers";

export interface balanceRes {
    balance: number;
}

export const decodeBalanceRes = (returnArray: unknown): balanceRes => {
    // return is actually not an array here, just a value because there is only 1 param
    const array = returnArray as any;

    if (!array) {
        return {
            balance: 0
        }
    }

    return {
        balance: parseFloat(ethers.utils.formatEther(array)),
    }
}