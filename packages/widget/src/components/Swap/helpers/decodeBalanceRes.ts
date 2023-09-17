/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

export interface BalanceRes {
    balance: number;
}

export const decodeBalanceRes = (returnArray: unknown): BalanceRes => {
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