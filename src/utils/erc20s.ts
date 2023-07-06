import { TokenTypes } from "../types/TokenOption";
import Token from "../types/Token";

export const TestTokens: TokenTypes[] = [
    {
        name: "USD Coin",
        address: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
        symbol: "USDCx",
        decimals: 18,
        chainId: 5,
        underlyingToken: {
            name: "USD Coin",
            address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
            symbol: "USDC",
            decimals: 18,
            chainId: 5,
            logoURI: "/usdc-logo.png"
        },
        logoURI: "/usdc-logo.png"
    },
    {
        name: "DAI Stablecoin",
        address: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
        symbol: "DAIx",
        decimals: 18,
        chainId: 5,
        underlyingToken: {
            name: "DAI Stablecoin",
            address: "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7",
            symbol: "DAI",
            decimals: 18,
            chainId: 5,
            logoURI: "/dai-logo.png"
        },
        logoURI: "/dai-logo.png"
    }
];