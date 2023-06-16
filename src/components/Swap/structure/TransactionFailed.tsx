import React from 'react';
import { BiMessageAltError } from 'react-icons/bi';
import { Theme } from '../../../theme';

interface TransactionFailedProps {
    swapTheme: Theme;
    setSwapActive: (value: boolean) => void;
    setIsApproved: (value: boolean) => void;
    setIsBufferAccepted: (value: boolean) => void;
    setIsSwapFinished: (value: boolean) => void;
}

const TransactionFailed = ({
    swapTheme,
    setSwapActive,
    setIsApproved,
    setIsBufferAccepted,
    setIsSwapFinished
}: TransactionFailedProps) => (
    <div className="w-full flex flex-col space-y-3 items-center justify-center">
        <div className="flex items-center justify-center h-[40%] w-full">
            <BiMessageAltError className="w-2/3 h-2/3 text-red-500" />
        </div>
        <div className="w-full text-white font-bold flex items-center justify-center">
            <h1 className="text-2xl">Something went wrong.</h1>
        </div>
        <div className="flex items-center text-center justify-center w-full py-2">
            <p className="text-white">
                Ensure you have enough super tokens to fulfill the buffer period.
                Learn more about buffers and super tokens{" "}
                <a href="https://docs.aqueduct.fi/docs/superfluid-concepts/super-tokens" target="_blank" rel="noopener noreferrer">
                    <span className="text-blue-500 hover:underline">here.</span>
                </a>
            </p>
        </div>

        <button className={`font-semibold 2rounded-gc-2xl bg-red-500 w-full rounded-full ease-in-out duration-300`}
            onClick={() => {
                setSwapActive(false)
                setIsBufferAccepted(false)
                setIsApproved(false)
                setIsSwapFinished(false)
            }}
            style={{
                // backgroundColor: swapTheme.swapButton,
                color: swapTheme.swapButtonText,
                fontSize: swapTheme.swapButtonFontSize,
                padding: swapTheme.swapButtonPadding
            }}>
            Dismiss
        </button>
    </div>
)

export default TransactionFailed;