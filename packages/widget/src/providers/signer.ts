import * as React from 'react'
import { type WalletClient, type Chain, useWalletClient, useNetwork } from 'wagmi'
import { providers } from 'ethers'

/* eslint-disable @typescript-eslint/no-explicit-any */
type ExternalProvider = {
    isMetaMask?: boolean;
    isStatus?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    request?: (request: { method: string, params?: Array<any> }) => Promise<any>
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function walletClientToSigner(walletClient: WalletClient, chain: Chain) {
    const { account, transport } = walletClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new providers.Web3Provider(transport as ExternalProvider, network)
    const signer = provider.getSigner(account.address)
    return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId });
    const { chain } = useNetwork();  // walletClient.chain is sometimes undefined, useNetwork() seems to always have a value
    return React.useMemo(
        () => (walletClient && walletClient.account && walletClient.transport && chain ? walletClientToSigner(walletClient, chain) : undefined),
        [walletClient, chain],
    )
}
