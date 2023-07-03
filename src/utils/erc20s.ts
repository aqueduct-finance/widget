import { TokenTypes } from "../types/TokenOption";
import Token from "../types/Token";

export const TestTokens: TokenTypes[] = [
    {
        name: "USD Coin",
        address: "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a",
        symbol: "USDCx",
        decimals: 18,
        chainId: 5,
        underlyingToken: {
            name: "USD Coin",
            address: "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7",
            symbol: "USDC",
            decimals: 18,
            chainId: 5,
            logoURI: "/usdc-logo.png"
        },
        logoURI: "/usdc-logo.png"
    },
    {
        name: "DAI Stablecoin",
        address: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
        symbol: "DAIx",
        decimals: 18,
        chainId: 5,
        underlyingToken: {
            name: "DAI Stablecoin",
            address: "0x88271d333C72e51516B67f5567c728E702b3eeE8",
            symbol: "DAI",
            decimals: 18,
            chainId: 5,
            logoURI: "/dai-logo.png"
        },
        logoURI: "/dai-logo.png"
    }
];