import { polygonMumbai } from "wagmi/chains";
import { PublicClient, createPublicClient, http } from 'viem'

export const publicClient: PublicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http()
})
