import React, { useRef, useState } from "react";
import Image from "next/image";
import { useStore } from "../../../store";
import { Theme } from "../../../theme";
import { BsPlus } from "react-icons/bs";

interface DynamicInputBoxProps {
    swapTheme: Theme;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    paddingPercentage: number;
    setSwapAmount: (value: number) => void;
    setDynamicInput: (value: string) => void;
    dynamicInput: string;
}

const DynamicInputBox = ({
    swapTheme,
    setShowModal,
    setOutbound,
    paddingPercentage,
    setSwapAmount,
    setDynamicInput,
    dynamicInput
}: DynamicInputBoxProps) => {
    const store = useStore();
    const inputRef = useRef(null);

    const PLACEHOLDER_SCROLL_LEFT = 20;

    const parentRef = useRef<HTMLDivElement>(null);
    const [divScrollLeft, setDivScrollLeft] = useState(PLACEHOLDER_SCROLL_LEFT);
    const [dynamicFontSize, setDynamicFontSize] = useState(72); // in px

    const activateInput = () => {
        inputRef.current.focus();
    };

    const regex = /\./g;

    const computeWidthAndAnimation = () => {
        const numericValue = parseFloat(dynamicInput.replace(/[^0-9.]/g, ""));
        setSwapAmount(numericValue)

        if (isNaN(numericValue)) {
            setDivScrollLeft(PLACEHOLDER_SCROLL_LEFT)
            return;
        }

        let computedStyle = window.getComputedStyle(inputRef.current);

        let getWidth = (fontSize: string) => {
            let div = document.createElement("div");
            div.innerText = dynamicInput;
            div.style.fontSize = fontSize;
            div.style.fontWeight = computedStyle.fontWeight;
            div.style.fontFamily = computedStyle.fontFamily;
            div.style.width = "auto";
            div.style.display = "inline-block";
            div.style.visibility = "hidden";
            div.style.position = "fixed";
            div.style.overflow = "auto";
            document.body.append(div);
            let width = div.offsetWidth;
            div.remove();
            return width;
        };

        if (parentRef.current) {
            let newFontSize =
                dynamicFontSize *
                (parentRef.current.clientWidth *
                    (1 - paddingPercentage) /
                    getWidth(`${dynamicFontSize}px`));
            newFontSize = parseFloat(newFontSize.toFixed(2));
            if (newFontSize > 72) {
                setDynamicFontSize(72)
                newFontSize = 72;
            } else {
                setDynamicFontSize(newFontSize)
            }

            if (dynamicInput === "") {
                setDivScrollLeft(PLACEHOLDER_SCROLL_LEFT)
                setDynamicFontSize(72)
            } else {
                setDivScrollLeft(getWidth(`${newFontSize}px`) / 2);
            }
        }
    }

    const handleInput = (e) => {
        const inputValue = e.target.value;

        const numericValue = inputValue.replace(/[^0-9.]/g, "");

        if (inputValue === "") {
            setDivScrollLeft(PLACEHOLDER_SCROLL_LEFT)
            computeWidthAndAnimation();
            setDynamicFontSize(72)
        }

        const periodsCount = (inputValue.match(regex) || []).length;

        if (periodsCount > 1) {
            return;
        }

        setDynamicInput(numericValue);
        computeWidthAndAnimation();
    }


    return (
        <div
            className={`w-full h-full`}
            style={{ color: swapTheme.primaryText }}
            onClick={activateInput}
        >
            <div
                ref={parentRef}
                className="w-full h-full flex items-center justify-end overflow-hidden space-x-2"
            >
                <div className="w-[30px] h-[30px] mb-12 cursor-pointer z-10">
                    {store.outboundToken ? (
                        <Image
                            src={store.outboundToken.logoURI}
                            width="40"
                            height="40"
                            alt="OutboundToken"
                            onClick={() => {
                                setOutbound(true)
                                setShowModal(true)
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                backgroundColor: swapTheme.plusBg,
                                borderColor: swapTheme.plusBorder,
                                borderWidth: swapTheme.secondaryBorderWidth,
                                color: swapTheme.plusColor,
                                borderRadius: swapTheme.itemBorderRadius
                            }}
                        >
                            <BsPlus className="w-full h-full" onClick={() => {
                                setOutbound(true)
                                setShowModal(true)
                            }} />
                        </div>
                    )}
                </div>
                <input
                    ref={inputRef}
                    style={{
                        width: `calc(50% + ${divScrollLeft}px)`,
                        fontSize: `${dynamicFontSize}px`,
                        fontFamily: swapTheme.numberFont,
                        fontWeight: swapTheme.primaryFontWeight,
                        backgroundColor: "transparent",
                        color: swapTheme.primaryText,
                        transitionDuration: swapTheme.accentDuration
                    }}
                    type="text"
                    className='outline-none transition-all'
                    onChange={handleInput}
                    value={dynamicInput}
                    placeholder="0"
                />
            </div>
        </div>
    )
}

export default DynamicInputBox;