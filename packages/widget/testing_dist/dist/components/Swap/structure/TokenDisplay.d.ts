import { TokenTypes } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
interface TokenDisplayProps {
    tokenOption: TokenTypes[];
    theme: Theme;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    outbound: boolean;
}
declare const TokenDisplay: ({ tokenOption, theme, setOutboundToken, setInboundToken, outbound }: TokenDisplayProps) => import("react/jsx-runtime").JSX.Element;
export default TokenDisplay;
