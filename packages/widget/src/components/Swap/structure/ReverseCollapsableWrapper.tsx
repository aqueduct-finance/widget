import React, { ReactNode } from "react";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";

interface ReverseCollapsableWrapperProps {
    style?: string;
    children: ReactNode;
    collapseId: CollapseState;
    expectedMaxHeight?: string;
}

const ReverseCollapsableWrapper = ({style, children, collapseId, expectedMaxHeight}: ReverseCollapsableWrapperProps) => {

    const store = useStore();

    return (
        <div
            className={`${store.collapseState == collapseId ? ((expectedMaxHeight ? expectedMaxHeight : 'max-h-96') + ' opacity-100 duration-[500ms] ' + (style ? style : '')) : 'max-h-0 invisible opacity-0 duration-[600ms]'} transition-all overflow-hidden -mx-2 px-2`}
        >
            {children}
        </div>
    )
}

export default ReverseCollapsableWrapper;