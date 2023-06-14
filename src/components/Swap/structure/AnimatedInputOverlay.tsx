/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";


export interface AnimatedInputRef {
    setValue: (number: string) => void;
}




// unused code... Animated input Ref still being passed and used in main file
// be sure to fix



interface AnimatedInputProps {
    unitSign?: JSX.Element;
    setFlip?: () => void;
    isUsd?: boolean;
    setDisplayedValue: (number: string, isUsd?: boolean) => void;
}

// eslint-disable-next-line react/display-name
const AnimatedInput = forwardRef<AnimatedInputRef, AnimatedInputProps>(
    ({ unitSign, setFlip, isUsd, setDisplayedValue }, ref) => {
        const [inputValue, setInputValue] = useState('');
        const [divScrollLeft, setDivScrollLeft] = useState(0);
        const selectionStart = useRef(-1);

        const setValue = (number: string) => {
            setInputValue(number);
        };

        useImperativeHandle(ref, () => ({
            setValue,
        }));

        function getCaretPosition(editableDiv: Node) {
            let caretPos = 0;
            const sel = window.getSelection();

            if (sel && sel.rangeCount) {
                const range = sel.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(editableDiv);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretPos = preCaretRange.toString().length;
            }

            return caretPos;
        }

        return (
            <div className="flex w-full h-full items-center justify-center">
                <div>{unitSign}</div>
                <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-purple-5002">
                    <div
                        className="flex items-center max-w-full pointer-events-none"
                    >
                        <div className="h-16 w-1" />
                        {inputValue.split('').map((char, index) => (
                            <span
                                key={`${char}-${index}`}
                                className="transition-all duration-[200ms] ease-in-out"
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </div>
                <div
                    contentEditable
                    placeholder="0"
                    inputMode="numeric"
                    onInput={(e) => {
                        const { textContent } = e.target as HTMLDivElement;
                        if (textContent && textContent.match(/^[0-9]*[.]?[0-9]*$/)) {
                            // get selection position
                            selectionStart.current = getCaretPosition(e.target as Node);

                            // set input value
                            setInputValue(textContent);

                            // set displayed value
                            setDisplayedValue(textContent, isUsd);
                        }

                        if (!textContent) {
                            setInputValue('');
                            setDisplayedValue('', isUsd);
                        }
                    }}
                    onScroll={(s) => {
                        const { scrollLeft } = s.target as HTMLDivElement;
                        setDivScrollLeft(scrollLeft);
                    }}
                    onBlur={(s) => {
                        s.target.scrollLeft = 0;
                        setDivScrollLeft(0);
                    }}
                    className="absolute top-0 left-8 w-[calc(100%-4rem)] outline-none text-center h-full text-transparent bg-transparent caret-white whitespace-nowrap overflow-auto hide-scrollbar"
                />
                <div className="w-8" />
            </div>
        );
    }
);

export default AnimatedInput;