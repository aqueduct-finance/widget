import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useStore } from "../../../store";
import { Theme } from "../../../theme";
import { BsPlus } from "react-icons/bs";

interface DynamicInputBoxProps {
    swapTheme: Theme;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    fontSize: number;
    swapAmount: number;
    paddingPercentage: number;
    setSwapAmount: (value: number) => void;
    setUseMax: (value: boolean) => void;
    useMax: boolean;
}

const DynamicInputBox = ({
    swapTheme,
    setShowModal,
    setOutbound,
    fontSize,
    swapAmount,
    paddingPercentage,
    setSwapAmount,
    setUseMax,
    useMax
}: DynamicInputBoxProps) => {
    const store = useStore();
    const inputRef = useRef(null);

    const parentRef = useRef<HTMLDivElement>(null);
    const [divScrollLeft, setDivScrollLeft] = useState(0);
    const [dynamicFontSize, setDynamicFontSize] = useState(fontSize); // in px

    const activateInput = () => {
        inputRef.current.focus();
    };

    const handleChange = (value: number) => {
        console.log("getting called");
        // handle input
        if (swapAmount) {
            const numericValue = parseFloat(swapAmount?.toString().replace(/[^0-9.]|(?<=\..*)\./g, ""));
            setSwapAmount(numericValue);

            if (parseFloat(swapAmount.toString()) !== numericValue) {
                console.log("asdf");
                return;
            }
        }
    };

    useEffect(() => {
        // width computation + animation
        const numericValue = parseFloat(swapAmount?.toString().replace(/[^0-9.]|(?<=\..*)\./g, ""));
        setSwapAmount(numericValue);

        if (isNaN(numericValue)) {
            console.log("Invalid input");
            return;
        }


        let computedStyle = window.getComputedStyle(inputRef.current);

        let getWidth = (fontSize: string) => {
            let div = document.createElement("div");
            div.innerText = swapAmount.toString();
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
            console.log(width)
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

            if (swapAmount === 0) {
                setDivScrollLeft(0)
            } else {
                setDivScrollLeft(getWidth(`${newFontSize}px`) / 2);
            }
            console.log(divScrollLeft)
        }
    }, [swapAmount]);

    useEffect(() => {
        console.log(divScrollLeft)
    }, [])


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
                        <div className="rounded-full"
                            style={{
                                backgroundColor: swapTheme.plusBg,
                                borderColor: swapTheme.plusBorder,
                                borderWidth: swapTheme.secondaryBorderWidth,
                                color: swapTheme.plusColor
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
                        fontSize: `${dynamicFontSize}px`
                    }}
                    type="text"
                    className='text-white bg-black outline-none transition-all duration-200'
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue === "") {
                            setSwapAmount(0); // or handle the empty case as per your requirement
                        } else {
                            setSwapAmount(parseFloat(inputValue));
                        }
                    }}
                    value={swapAmount !== 0 && !isNaN(swapAmount) ? swapAmount?.toString() : ""}
                />
            </div>
        </div>
    )
}

export default DynamicInputBox;