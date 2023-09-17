import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import '../../styles/SwapWidget.module.css';
interface SwapWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    width: string;
}
declare const SwapWidget: ({ theme, tokenOption, defaultTokens, width }: SwapWidgetProps) => import("react/jsx-runtime").JSX.Element;
export default SwapWidget;
