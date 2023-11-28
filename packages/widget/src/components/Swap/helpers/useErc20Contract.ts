import { WalletClient, getContract } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";
import getChainId from "./getChainId";

const useErc20Contract = (tokenAddress: string | undefined) => {
    const publicClient = usePublicClient();

    const chainId = getChainId();
    if (!chainId) { return; }

    const { data: walletClientData } = useWalletClient({ chainId: chainId });
    const walletClient = walletClientData as WalletClient;

    if (!tokenAddress) { return }

    const tokenABI = [
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"balanceOf",
            "outputs":[
                {
                    "internalType":"int256",
                    "name":"balance",
                    "type":"int256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        }, 
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
    ]

    const contract = getContract({
        address: tokenAddress as `0x${string}`,
        abi: tokenABI,
        publicClient,
        walletClient
    });

    return contract;
}

export default useErc20Contract;