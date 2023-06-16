import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React from 'react'

interface PriceImpactProps {
    length: number;
    setLength: (value: number) => void;
    theme?: Theme;
}

// TODO: Is this component needed? Not used anywhere right now
const PriceImpact = ({ length, setLength, theme }: PriceImpactProps) => {

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    // to do: calculate price impact

    return (
        <div className="w-[32.5%] flex flex-col items-center px-3 py-2 rounded-lg"
            style={{
                backgroundColor: swapTheme.streamLengthBox
            }}
        >
            <p
                style={{
                    color: swapTheme.tokenBalance
                }}
            >Price Impact</p>
            <h1 className="text-2xl"
                style={{
                    color: swapTheme.primaryText
                }}
            >0.001%</h1>
        </div>
    )
}

export default PriceImpact;