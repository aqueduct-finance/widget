import { Theme } from "../../../theme";
interface ApproveRowProps {
    item: {
        title: string;
        data: string;
    };
    index: number;
    swapTheme: Theme;
}
declare const ApproveRow: ({ item, index, swapTheme }: ApproveRowProps) => import("react/jsx-runtime").JSX.Element;
export default ApproveRow;
