import { ReactNode } from "react";
import { CollapseState } from "../../../types/CollapseState";
interface ReverseCollapsableWrapperProps {
    style?: string;
    children: ReactNode;
    collapseId: CollapseState;
    expectedMaxHeight?: string;
}
declare const ReverseCollapsableWrapper: ({ style, children, collapseId, expectedMaxHeight }: ReverseCollapsableWrapperProps) => import("react/jsx-runtime").JSX.Element;
export default ReverseCollapsableWrapper;
