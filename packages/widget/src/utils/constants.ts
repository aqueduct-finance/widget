import getChainId from "../components/Swap/helpers/getChainId";

export const goerliChainId = 5;

export const mumbaiChainId = 80001;

export const DEFAULT_PAY_ONCE = 3600 * 24;

interface Addresses {
    cfaV1: string;
    aqueductFactory: string;
}

interface Constants {
    [key: string]: Addresses;
}

export const constants: Constants = {
    5: { // goerli
        cfaV1: "",
        aqueductFactory: ""
    },
    80001: { // mumbai
        cfaV1: "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
        aqueductFactory: "0x6FF6508E881D677D5e40e7C1619008F9ff46A5F8"
    }
};

export function getAddresses(chainId: number): Addresses {
    return constants[chainId];
}

export function getDefaultAddresses(): Addresses | undefined {
    const chainId = getChainId();
    if (!chainId) { return; }

    return getAddresses(chainId);
}
