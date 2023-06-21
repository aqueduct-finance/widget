import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React from 'react'

interface StreamLengthProps {
    length: number;
    setLength: (value: number) => void;
    theme?: Theme;
}

const StreamLength = ({ setLength, theme, length }: StreamLengthProps) => {

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <div className="w-full flex flex-col space-y-2 px-5 py-3"
            style={{
                backgroundColor: swapTheme.tokenBox,
                borderRadius: swapTheme.secondaryBorderRadius
            }}
        >
            <div className="flex flex-row space-x-2">
                <p
                    style={{
                        color: swapTheme.accentText,
                        fontWeight: swapTheme.secondaryFontWeight,
                        fontFamily: swapTheme.textFont
                    }}
                >
                    Duration:
                </p>
                <div className="px-2 text-sm flex items-center flex-row space-x-1 justify-center"
                    style={{
                        backgroundColor: swapTheme.useMaxButton,
                        color: swapTheme.streamLengthText,
                        borderRadius: swapTheme.itemBorderRadius,

                    }}
                >
                    <p
                        style={{
                            fontFamily: swapTheme.numberFont
                        }}
                    >{length}</p>
                    <p
                        style={{
                            fontFamily: swapTheme.textFont
                        }}
                    >hours</p>
                </div>
            </div>
            <div className="w-full">
                <input
                    className="appearance-none h-[5px] w-full cursor-pointer"
                    style={{
                        backgroundColor: swapTheme.plusBg, // TODO: probably should be its own theme color, or could combine into e.g. 'light accent color'
                        accentColor: swapTheme.inputDot,
                        borderRadius: swapTheme.accentBorderRadius,
                    }}
                    type="range"
                    min={1}
                    max={720}
                    value={length}
                    onChange={(e) => {
                        setLength(parseInt(e.target.value))
                    }}
                />
            </div>
        </div>
    )
}

export default StreamLength;