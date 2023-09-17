import { getContract } from "viem";
import { getPublicClient } from '@wagmi/core'

const getErc20Contract = (tokenAddress: string | undefined) => {
    
    const publicClient = getPublicClient({ chainId: 80001 });   

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
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
    ]

    const contract = getContract({
        address: tokenAddress as `0x${string}`,
        abi: tokenABI,
        publicClient
    });

    return contract;
}

export default getErc20Contract;