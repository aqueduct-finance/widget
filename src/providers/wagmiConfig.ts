import { goerli } from "wagmi/chains";
import { createPublicClient, http } from "viem";

// eslint-disable-next-line import/prefer-default-export
export const publicClient = createPublicClient({
    chain: goerli,
    transport: http(),
});
