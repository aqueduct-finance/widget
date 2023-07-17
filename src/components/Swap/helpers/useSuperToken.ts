/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContract } from "viem";
import { usePublicClient } from "wagmi";

const useSuperToken = (tokenAddress: string | undefined): any => {
    const publicClient = usePublicClient({ chainId: 80001 });

    if (!tokenAddress) { return }

    const superTokenABI = [
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"timestamp",
                    "type":"uint256"
                }
            ],
            "name":"realtimeBalanceOf",
            "outputs":[
                {
                    "internalType":"int256",
                    "name":"availableBalance",
                    "type":"int256"
                },
                {
                    "internalType":"uint256",
                    "name":"deposit",
                    "type":"uint256"
                },
                {
                    "internalType":"uint256",
                    "name":"owedDeposit",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        }
    ]

    const contract = getContract({
        address: tokenAddress as `0x${string}`,
        abi: superTokenABI,
        publicClient,
    });

    return contract;
}

export default useSuperToken;