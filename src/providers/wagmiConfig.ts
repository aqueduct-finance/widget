import { createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const chains = [goerli];

export const config = createConfig(
    getDefaultConfig({
        alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

        appName: "Aqueduct",
        chains
    }),
);