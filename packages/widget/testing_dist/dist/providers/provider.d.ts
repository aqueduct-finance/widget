import { type PublicClient } from 'wagmi';
import { providers } from 'ethers';
export declare function publicClientToProvider(publicClient: PublicClient): providers.JsonRpcProvider;
/** Hook to convert a viem Public Client to an ethers.js Provider. */
export declare function useEthersProvider({ chainId }?: {
    chainId?: number;
}): providers.JsonRpcProvider;
