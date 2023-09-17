import { Theme } from "../../../theme";
interface DataDisplayProps {
    swapTheme: Theme;
    isShown: boolean;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    outgoingFlowRate: number;
}
declare const DataDisplay: ({ swapTheme, isShown, startDate, startTime, endDate, endTime, outgoingFlowRate, }: DataDisplayProps) => import("react/jsx-runtime").JSX.Element;
export default DataDisplay;
