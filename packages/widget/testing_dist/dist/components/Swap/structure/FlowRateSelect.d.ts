import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { TokenOption } from "../../../types/TokenOption";
import { Theme } from "../../../theme";
interface SelectProps {
    dropdownValue: GenericDropdownOption | TokenOption;
    theme?: Theme;
}
declare const FlowRateSelect: ({ dropdownValue, theme }: SelectProps) => import("react/jsx-runtime").JSX.Element;
export default FlowRateSelect;
