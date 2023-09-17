import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { Theme } from "../../../theme";
interface FlowRateRowProps {
    options: GenericDropdownOption[];
    setDropdownValue: ((value: GenericDropdownOption) => void);
    theme?: Theme;
}
declare const FlowRateRow: ({ options, setDropdownValue, theme }: FlowRateRowProps) => import("react/jsx-runtime").JSX.Element;
export default FlowRateRow;
