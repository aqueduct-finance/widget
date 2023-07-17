import React, { ReactNode } from "react";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";

interface CollapsableWrapperProps {
    defaultStyle?: string;
    children: ReactNode;
}

const CollapsableWrapper = ({defaultStyle, children}: CollapsableWrapperProps) => {

    const store = useStore();

    return (
        <div
            className={`${store.collapseState == CollapseState.NONE ? ('max-h-96 opacity-100 ' + (defaultStyle ? defaultStyle : '')) : 'max-h-0 opacity-0'} transition-all duration-500 overflow-hidden -mx-2 px-2`}
        >
            {children}
        </div>
    )
}

export default CollapsableWrapper;