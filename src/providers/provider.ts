import * as React from 'react'
import { type PublicClient, usePublicClient } from 'wagmi'
import { providers } from 'ethers'

export function publicClientToProvider(publicClient: PublicClient) {
    const { chain, transport } = publicClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const url = transport.type === 'fallback' ? transport.transports[0].value.url : transport.url;
    return new providers.JsonRpcProvider(url, network)
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
    const publicClient = usePublicClient({ chainId })
    return React.useMemo(() => publicClientToProvider(publicClient), [publicClient])
}


