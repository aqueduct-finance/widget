export type TokenTypes = {
    name: string;
    address: `0x${string}`;
    symbol: string;
    decimals: number;
    underlyingToken?: TokenTypes;
    logoURI: string;
};
