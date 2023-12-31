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
            className={`${store.collapseState == collapseId ? ((expectedMaxHeight ? expectedMaxHeight : 'max-h-96') + ' opacity-100 ' + (style ? style : '')) : 'max-h-0 opacity-0'} transition-all duration-500 overflow-hidden -mx-2 px-2`}
        >
            {children}
        </div>
    )
}

export default ReverseCollapsableWrapper;