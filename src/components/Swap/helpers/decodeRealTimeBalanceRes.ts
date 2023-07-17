import { BigNumber, ethers } from "ethers";

export interface realTimeBalanceRes {
    availableBalance: number;
    deposit: number;
    owedDeposit: number;
}

export const decodeRealTimeBalanceRes = (returnArray: unknown): realTimeBalanceRes => {
    const array = returnArray as any[];

    if (!array || array.length < 3) {
        return {
            availableBalance: 0,
            deposit: 0,
            owedDeposit: 0
        }
    }

    return {
        availableBalance: parseFloat(ethers.utils.formatEther(array[0])),
        deposit: parseFloat(ethers.utils.formatEther(array[1])),
        owedDeposit: parseFloat(ethers.utils.formatEther(array[2]))
    }
}