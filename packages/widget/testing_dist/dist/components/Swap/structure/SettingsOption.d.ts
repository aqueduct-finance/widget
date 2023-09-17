import { Theme } from "../../../theme";
interface SettingsOptionProps {
    item: {
        title: string;
        state: boolean;
        setState: (value: boolean) => void;
    };
    index: number;
    swapTheme: Theme;
}
declare const SettingsOption: ({ item, index, swapTheme }: SettingsOptionProps) => import("react/jsx-runtime").JSX.Element;
export default SettingsOption;
