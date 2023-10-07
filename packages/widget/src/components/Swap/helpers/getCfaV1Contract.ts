import { getContract } from "viem";
import { getPublicClient } from '@wagmi/core'
import { cfaV1 } from "../../../utils/constants";

const getCfaV1Contract = () => {
    
    const publicClient = getPublicClient({ chainId: 80001 });   

    const address = cfaV1;

    const abi = [
        {
            "inputs":[
                {
                    "internalType":"contract ISuperfluidToken",
                    "name":"token",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"sender",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"receiver",
                    "type":"address"
                }
            ],
            "name":"getFlow",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"timestamp",
                    "type":"uint256"
                },
                {
                    "internalType":"int96",
                    "name":"flowRate",
                    "type":"int96"
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
        address: address as `0x${string}`,
        abi: abi,
        publicClient
    });

    return contract;
}

export default getCfaV1Contract;