import { goerli } from "wagmi/chains";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
    chain: goerli,
    transport: http(),
});
