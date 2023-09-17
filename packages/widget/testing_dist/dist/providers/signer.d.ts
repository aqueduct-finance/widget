import { type WalletClient } from 'wagmi';
import { providers } from 'ethers';
export declare function walletClientToSigner(walletClient: WalletClient): providers.JsonRpcSigner;
/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export declare function useEthersSigner({ chainId }?: {
    chainId?: number;
}): providers.JsonRpcSigner;