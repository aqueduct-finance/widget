import React, { ReactNode } from "react";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";
import { BsArrowLeftShort } from "react-icons/bs";
import { Theme } from "../../../theme";
import { defaultTheme } from "../../../theme/theme";

interface CollapsableModalWrapperProps {
    defaultStyle?: string;
    openedStyle?: string;
    collapseId: CollapseState;
    buttonContent: ReactNode;
    modal: ReactNode;
    customModalHeight?: string;
    theme?: Theme;
}

const CollapsableModalWrapper = ({defaultStyle, openedStyle, collapseId, buttonContent, modal, customModalHeight, theme}: CollapsableModalWrapperProps) => {

    const store = useStore();
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <div 
            className={
                `${
                    store.collapseState == collapseId ? (openedStyle ? openedStyle : '') : (store.collapseState == CollapseState.NONE ? (defaultStyle ? defaultStyle : '') : '')
                } 
                transition-all duration-[550ms] -mx-2 px-2`
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
                    <div 
                        className="rounded-full p-1 w-min text-2xl"
                        style={{
                            backgroundColor: swapTheme.tokenBox,
                            borderRadius: swapTheme.secondaryBorderRadius,
                            borderColor: swapTheme.accentBorderColor,
                            borderWidth: swapTheme.accentBorderWidth,
                            boxShadow: swapTheme.accentShadow,
                            color: swapTheme.secondaryText
                        }}
                    >
                        <BsArrowLeftShort />
                    </div>
                </div>
                <div
                    className="w-full outline"
                    style={{
                        borderRadius: swapTheme.secondaryBorderRadius,
                        outlineColor: swapTheme.accentBorderColor,
                        outlineWidth: swapTheme.accentBorderWidth,
                        boxShadow: swapTheme.accentShadow
                    }}
                >
                    {buttonContent}
                </div>
            </button>
            <div
                className={`${store.collapseState == collapseId ? ((customModalHeight ? customModalHeight : 'max-h-96') + ' opacity-100 duration-[550ms]') : 'max-h-0 invisible opacity-0 duration-[500ms]'} w-full transition-all overflow-hidden`}
            >
                {modal}
            </div>
        </div>
    )
}

export default CollapsableModalWrapper;