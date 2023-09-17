import { Theme } from "../../../theme";
interface DynamicInputBoxProps {
    swapTheme: Theme;
    dynamicInput: number;
    paddingPercentage: number;
    setDynamicInput: (value: number) => void;
}
declare const DynamicInputBox: ({ swapTheme, dynamicInput, paddingPercentage, setDynamicInput }: DynamicInputBoxProps) => import("react/jsx-runtime").JSX.Element;
export default DynamicInputBox;
