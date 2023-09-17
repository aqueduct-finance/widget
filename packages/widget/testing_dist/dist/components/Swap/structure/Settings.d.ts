import { Theme } from "../../../theme";
interface SettingsProps {
    theme?: Theme;
    display: boolean;
    setDisplay: (value: boolean) => void;
    autoWrap: boolean;
    setAutoWrap: (value: boolean) => void;
    schedule: boolean;
    setSchedule: (value: boolean) => void;
}
declare const Settings: ({ display, theme, setDisplay, autoWrap, setAutoWrap, schedule, setSchedule, }: SettingsProps) => import("react/jsx-runtime").JSX.Element;
export default Settings;
