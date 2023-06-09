import { TokenTypes } from "../types/TokenOption";

export const TestTokens: TokenTypes[] = [
    {
        name: "USD Coin",
        address: "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7",
        symbol: "USDC",
        decimals: 18,
        chainId: 137,
        logoURI: "/usdc-logo.png"
    },
    {
        name: "DAI Stablecoin",
        address: "0x88271d333C72e51516B67f5567c728E702b3eeE8",
        symbol: "DAI",
        decimals: 18,
        chainId: 137,
        logoURI: "/dai-logo.png"
    }
];