import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { ethers } from "ethers";
import { useStore } from "../../../store";
import { Theme } from "../../../theme";

interface DynamicInputBoxProps {
    swapTheme: Theme;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    swapAmount: number;
    paddingPercentage: number;
    setSwapAmount: (value: number) => void;
    setDynamicInput: (value: string) => void;
    dynamicInput: string;
    setSwapFlowRate: (value: string) => void;
}

const DynamicInputBox = ({
    swapTheme,
    setShowModal,
    setOutbound,
    swapAmount,
    paddingPercentage,
    setSwapAmount,
    setDynamicInput,
    dynamicInput,
    setSwapFlowRate,
}: DynamicInputBoxProps) => {
    const { flowrateUnit, outboundToken } = useStore();
    const inputRef = useRef(null);

    const parentRef = useRef<HTMLDivElement>(null);
    const [divScrollLeft, setDivScrollLeft] = useState(0);
    const [dynamicFontSize, setDynamicFontSize] = useState(72); // in px

    const activateInput = () => {
        inputRef.current.focus();
    };

    const regex = /\./g;

    // FIXME: remove useEffect
    useEffect(() => {
        // width computation + animation

        const numericValue = parseFloat(dynamicInput.replace(/[^0-9.]/g, ""));
        setSwapAmount(numericValue);

        if (Number.isNaN(numericValue)) {
            setDivScrollLeft(0);
            return;
        }

        const computedStyle = window.getComputedStyle(inputRef.current);

        const getWidth = (fontSize: string) => {
            const div = document.createElement("div");
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
            const width = div.offsetWidth;
            div.remove();
            return width;
        };

        if (parentRef.current) {
            let newFontSize =
                dynamicFontSize *
                ((parentRef.current.clientWidth * (1 - paddingPercentage)) /
                    getWidth(`${dynamicFontSize}px`));
            newFontSize = parseFloat(newFontSize.toFixed(2));
            if (newFontSize > 72) {
                setDynamicFontSize(72);
                newFontSize = 72;
            } else {
                setDynamicFontSize(newFontSize);
            }

            if (dynamicInput === "") {
                setDivScrollLeft(0);
                setDynamicFontSize(72);
            } else {
                setDivScrollLeft(getWidth(`${newFontSize}px`) / 2);
            }
        }
    }, [
        swapAmount,
        dynamicInput,
        divScrollLeft,
        setSwapAmount,
        dynamicFontSize,
        paddingPercentage,
    ]);

    const handleInput = (e) => {
        const inputValue = e.target.value;

        const numericValue = inputValue.replace(/[^0-9.]/g, "");

        if (inputValue === "") {
            setDivScrollLeft(0);
            setDynamicFontSize(72);
        }

        const periodsCount = (inputValue.match(regex) || []).length;

        if (periodsCount > 1) {
            return;
        }

        setDynamicInput(numericValue);
    };

    const setFormattedNumberCallback = useCallback(
        async (newValue: string) => {
            function setFormattedNumber() {
                if (newValue === "") {
                    setSwapFlowRate("");
                    return;
                }

                if (
                    newValue.match("^[0-9]*[.]?[0-9]*$") != null &&
                    newValue !== "."
                ) {
                    let formattedValue = ethers.utils.parseUnits(
                        newValue,
                        "ether"
                    );

                    formattedValue = formattedValue.div(flowrateUnit.value);

                    setSwapFlowRate(formattedValue.toString());
                }
            }

            setFormattedNumber();
        },
        [setSwapFlowRate, flowrateUnit.value]
    );

    useEffect(() => {
        setFormattedNumberCallback(dynamicInput);
    }, [dynamicInput, setFormattedNumberCallback]);

    return (
        <div
            role="button"
            className="w-full h-full"
            style={{ color: swapTheme.primaryText }}
            onClick={activateInput}
            onKeyUp={activateInput}
            tabIndex={0}
        >
            <div
                ref={parentRef}
                className="w-full h-full flex items-center justify-end overflow-hidden space-x-2"
            >
                <div className="w-[30px] h-[30px] mb-12 cursor-pointer z-10">
                    {outboundToken ? (
                        <Image
                            src={outboundToken.logoURI}
                            width="40"
                            height="40"
                            alt="OutboundToken"
                            onClick={() => {
                                setOutbound(true);
                                setShowModal(true);
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                backgroundColor: swapTheme.plusBg,
                                borderColor: swapTheme.plusBorder,
                                borderWidth: swapTheme.secondaryBorderWidth,
                                color: swapTheme.plusColor,
                                borderRadius: swapTheme.itemBorderRadius,
                            }}
                        >
                            <BsPlus
                                className="w-full h-full"
                                onClick={() => {
                                    setOutbound(true);
                                    setShowModal(true);
                                }}
                            />
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
                        transitionDuration: swapTheme.accentDuration,
                    }}
                    type="text"
                    className="outline-none transition-all"
                    onChange={handleInput}
                    value={dynamicInput}
                />
            </div>
        </div>
    );
};

export default DynamicInputBox;
