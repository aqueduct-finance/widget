import { getContract } from "viem";
import { getPublicClient } from '@wagmi/core'
import { aqueductFactory } from "../../../utils/constants";

const getFactoryContract = () => {
    
    const publicClient = getPublicClient({ chainId: 80001 });   

    const address = aqueductFactory;

    const abi = [
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"","type":"address"
                }
            ],
            "name":"getPair",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
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

export default getFactoryContract;