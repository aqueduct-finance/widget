/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

export interface AllowanceRes {
    allowance: number;
}

export const decodeAllowanceRes = (returnArray: unknown): AllowanceRes => {
    // return is actually not an array here, just a value because there is only 1 param
    const array = returnArray as any;

    if (!array) {
        return {
            allowance: 0
        }
    }

    return {
        allowance: parseFloat(ethers.utils.formatEther(array)),
    }
}