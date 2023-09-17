import { Theme } from "../../../theme";
interface SettingsModalProviderProps {
    theme?: Theme;
    showSettings: boolean;
    setShowSettings: (value: boolean) => void;
    autoWrap: boolean;
    setAutoWrap: (value: boolean) => void;
    schedule: boolean;
    setSchedule: (value: boolean) => void;
}
declare const SettingsModalProvider: ({ theme, showSettings, setShowSettings, autoWrap, setAutoWrap, schedule, setSchedule, }: SettingsModalProviderProps) => import("react/jsx-runtime").JSX.Element;
export default SettingsModalProvider;
