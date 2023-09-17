export interface RealTimeBalanceRes {
    availableBalance: number;
    deposit: number;
    owedDeposit: number;
}
export declare const decodeRealTimeBalanceRes: (returnArray: unknown) => RealTimeBalanceRes;
