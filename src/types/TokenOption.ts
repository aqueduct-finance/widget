import Token from "./Token";

export type TokenOption = {
    label: string;
    value: Token;
    logo: string;
    address: string;
    underlyingToken?: TokenOption;
    colorHex: string;
};

// regular ERC20s no wrap 👇

export type TokenTypes = {
    name: string;
    address: `0x${string}`;
    symbol: string;
    decimals: number;
    chainId: number;
    underlyingToken?: TokenTypes;
    logoURI: string;
}