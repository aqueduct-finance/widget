import React, { ReactNode } from "react";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";
import { BsArrowLeftShort } from "react-icons/bs";

interface CollapsableModalWrapperProps {
    defaultStyle?: string;
    openedStyle?: string;
    collapseId: CollapseState;
    buttonContent: ReactNode;
    modal: ReactNode;
    customModalHeight?: string;
}

const CollapsableModalWrapper = ({defaultStyle, openedStyle, collapseId, buttonContent, modal, customModalHeight}: CollapsableModalWrapperProps) => {

    const store = useStore();

    return (
        <div 
            className={
                `${
                    store.collapseState == collapseId ? (openedStyle ? openedStyle : '') : (store.collapseState == CollapseState.NONE ? (defaultStyle ? defaultStyle : '') : '')
                } 
                transition-all duration-[550ms] -mx-2 px-2 overflow-hidden`
            }
        >
            <button
                onClick={() => {
                    const newCollapseState = store.collapseState == collapseId ? CollapseState.NONE : collapseId;
                    store.setCollapseState(newCollapseState);
                }}
                className={`${store.collapseState == CollapseState.NONE || store.collapseState == collapseId ? 'max-h-96 opacity-100' : 'max-h-0 invisible opacity-0'} flex items-center w-full transition-all duration-[500ms] hover:scale-[1.02]`}
            >
                <div
                    className={`${store.collapseState == collapseId ? 'max-w-xs opacity-100 duration-[2000ms]' : 'max-w-0 opacity-0 duration-[750ms]'} flex items-center w-12 h-8 text-white transition-all`}
                >
                    <div className="bg-white/10 rounded-full p-1 text-white/75 w-min text-2xl">
                        <BsArrowLeftShort />
                    </div>
                </div>
                {buttonContent}
            </button>
            <div
                className={`${store.collapseState == collapseId ? ((customModalHeight ? customModalHeight : 'max-h-96') + ' opacity-100 duration-[550ms]') : 'max-h-0 invisible opacity-0 duration-[500ms]'} w-full transition-all`}
            >
                {modal}
            </div>
        </div>
    )
}

export default CollapsableModalWrapper;