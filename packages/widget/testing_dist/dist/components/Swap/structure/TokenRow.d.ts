import { Theme } from '../../../theme';
import { TokenTypes } from '../../../types/TokenOption';
interface TokenRowProps {
    item: TokenTypes;
    index: number;
    isHover: boolean[];
    swapTheme: Theme;
    handleMouseEnter: (index: number) => void;
    handleMouseLeave: (index: number) => void;
    setOutboundToken: (token: TokenTypes) => void;
    setInboundToken: (token: TokenTypes) => void;
    outbound: boolean;
}
declare const TokenRow: ({ item, index, isHover, swapTheme, handleMouseEnter, handleMouseLeave, setOutboundToken, setInboundToken, outbound }: TokenRowProps) => import("react/jsx-runtime").JSX.Element;
export default TokenRow;
