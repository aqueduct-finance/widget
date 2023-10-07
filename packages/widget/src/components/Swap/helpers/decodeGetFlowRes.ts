/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

export interface GetFlowRes {
    timestamp: number;
    flowRate: number; 
    deposit: number; 
    owedDeposit: number;
}

export const decodeGetFlowRes = (returnArray: unknown): GetFlowRes => {
    const array = returnArray as any[];

    if (!array || array.length < 4) {
        return {
            timestamp: 0,
            flowRate: 0,
            deposit: 0, 
            owedDeposit: 0
        }
    }

    return {
        timestamp: parseFloat(array[0]),
        flowRate: parseFloat(array[1]),
        deposit: parseFloat(ethers.utils.formatEther(array[2])),
        owedDeposit: parseFloat(ethers.utils.formatEther(array[3]))
    }
}