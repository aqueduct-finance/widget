import { TokenTypes } from "../types/TokenOption";

export const TestTokens: TokenTypes[] = [
    {
        name: "USD Coin",
        address: "0x3a36cD6D55e260E0a3448cd8905c51517bb7EbA8",
        symbol: "USDCx",
        decimals: 18,
        chainId: 5,
        underlyingToken: {
            name: "USD Coin",
            address: "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7",
            symbol: "USDC",
            decimals: 18,
            chainId: 5,
            logoURI: "/usdc-logo.png",
        },
        logoURI: "/usdc-logo.png",
    },
    {
        name: "DAI Stablecoin",
        address: "0xB133415Ae49150bCd8cDB7f515c30EbA2b42F2fe",
        symbol: "DAIx",
        decimals: 18,
        chainId: 5,
        underlyingToken: {
            name: "DAI Stablecoin",
            address: "0x88271d333C72e51516B67f5567c728E702b3eeE8",
            symbol: "DAI",
            decimals: 18,
            chainId: 5,
            logoURI: "/dai-logo.png",
        },
        logoURI: "/dai-logo.png",
    },
];
