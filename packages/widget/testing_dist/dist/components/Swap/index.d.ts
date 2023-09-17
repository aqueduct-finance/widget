import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { lightTheme, darkTheme } from "../../theme/defaultThemes";
import '../../styles/globals.css';
interface ExportedWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    chainName?: string;
    width?: string;
    outboundToken?: string;
    inboundToken?: string;
}
declare const TWAMMWidget: ({ theme, tokenOption, defaultTokens, width, outboundToken, inboundToken, }: ExportedWidgetProps) => import("react/jsx-runtime").JSX.Element;
export default TWAMMWidget;
export { lightTheme, darkTheme };
