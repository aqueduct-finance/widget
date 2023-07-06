import { polygonMumbai } from "wagmi/chains";
import { createPublicClient, http } from 'viem'

export const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http()
})