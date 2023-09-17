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
            className={`${store.collapseState == CollapseState.NONE ? ('max-h-96 opacity-100 duration-[550ms] ' + (defaultStyle ? defaultStyle : '')) : 'max-h-0 invisible opacity-0 duration-[500ms]'} transition-all overflow-hidden -mx-2 px-2`}
        >
            {children}
        </div>
    )
}

export default CollapsableWrapper;