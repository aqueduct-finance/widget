import React from 'react';
import { BiMessageAltError } from 'react-icons/bi';
import { Theme } from '../../../theme';
import { CollapseState } from '../../../types/CollapseState';
import { useStore } from '../../../store';

interface TransactionFailedProps {
    swapTheme: Theme;
}

const TransactionFailed = ({
    swapTheme
}: TransactionFailedProps) => {
    
    const store = useStore();

    return(
        <div className="w-full h-full flex flex-col items-center justify-end pt-10"
            style={{
                fontFamily: swapTheme.textFont
            }}
        >
            <div className="flex items-center justify-center h-32 w-full">
                <BiMessageAltError
                    className="w-2/3 h-full"
                    style={{
                        color: swapTheme.errorColor
                    }}
                />
            </div>
            <div className="w-full flex items-center justify-center py-4"
                style={{
                    color: swapTheme.primaryText,
                    fontWeight: swapTheme.primaryFontWeight
                }}
            >
                <h1 className="text-2xl">Something went wrong.</h1>
            </div>
            <div className='w-full px-6 pb-8'>
                <div 
                    className='relative overflow-hidden break-words opacity-75 px-4 py-3 '
                    style={{
                        color: swapTheme.secondaryText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        borderRadius: swapTheme.accentBorderRadius,
                        borderWidth: swapTheme.accentBorderWidth,
                        borderColor: swapTheme.errorColor
                    }}
                >
                    <div 
                        className='w-full overflow-hidden max-h-28'
                    >
                        {store.streamTransactionError ?? 'Unknown error'}
                    </div>
                    <div
                        className='absolute top-0 left-0 bottom-0 right-0 opacity-25 -z-10'
                        style={{
                            backgroundColor: swapTheme.errorColor
                        }}
                    />
                </div>
            </div>
            <div className='flex grow' />
            <button 
                className={`w-full rounded-full ease-in-out`}
                onClick={() => {
                    /*setSwapActive(false)
                    setIsBufferAccepted(false)
                    setIsApproved(false)
                    setIsSwapFinished(false)*/
                    store.setCollapseState(CollapseState.NONE);
                }}
                style={{
                    backgroundColor: swapTheme.errorColor,
                    color: swapTheme.swapButtonText,
                    fontSize: swapTheme.swapButtonFontSize,
                    padding: swapTheme.swapButtonPadding,
                    fontWeight: swapTheme.primaryFontWeight,
                    borderRadius: swapTheme.swapButtonRadius,
                    transitionDuration: swapTheme.primaryDuration
                }}
            >
                Dismiss
            </button>
        </div>
    )
}

export default TransactionFailed;
