import { ReactNode } from "react";
import { CollapseState } from "../../../types/CollapseState";
interface CollapsableModalWrapperProps {
    defaultStyle?: string;
    openedStyle?: string;
    collapseId: CollapseState;
    buttonContent: ReactNode;
    modal: ReactNode;
    customModalHeight?: string;
}
declare const CollapsableModalWrapper: ({ defaultStyle, openedStyle, collapseId, buttonContent, modal, customModalHeight }: CollapsableModalWrapperProps) => import("react/jsx-runtime").JSX.Element;
export default CollapsableModalWrapper;
