import React, { useRef, useState } from "react";
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
}

const DynamicInputBox = ({
    swapTheme,
    setShowModal,
    setOutbound,
    fontSize,
    swapAmount,
    paddingPercentage,
    setSwapAmount,
    setUseMax
}: DynamicInputBoxProps) => {
    const store = useStore();
    const inputRef = useRef(null);

    const parentRef = useRef<HTMLDivElement>(null);
    const [divScrollLeft, setDivScrollLeft] = useState(0);
    const [dynamicFontSize, setDynamicFontSize] = useState(fontSize); // in px

    const activateInput = () => {
        inputRef.current.focus();
    };

    /*
    const handleInputChange = (e) => {
        setUseMax(false);
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9.]/g, "");
        setSwapAmount(numericValue);

        if (value !== numericValue) {
            return;
        }

        setPreviousLength(valueLength);
        setValueLength(value.length);
    };
    */
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // handle input
        setUseMax(false);
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9.]|(?<=\..*)\./g, ""); // updated this to prevent multiple decimal points
        setSwapAmount(numericValue);

        if (value !== numericValue) {
            console.log('asdf')
            e.preventDefault();
            return;
        }

        // width computation + animation
        let computedStyle = window.getComputedStyle(e.target);
    
        let getWidth = (fontSize: string) => {
            let div = document.createElement('div');
            div.innerText = e.target.value;
            div.style.fontSize = fontSize;
            div.style.fontWeight = computedStyle.fontWeight;
            div.style.fontFamily = computedStyle.fontFamily;
            div.style.width = 'auto';
            div.style.display = 'inline-block';
            div.style.visibility = 'hidden';
            div.style.position = 'fixed';
            div.style.overflow = 'auto';
            document.body.append(div)
            let width = div.offsetWidth;
            div.remove();
            return width;
        };
    
        if (parentRef.current) {
            let newFontSize = dynamicFontSize * (parentRef.current.clientWidth * (1 - paddingPercentage) / getWidth(`${dynamicFontSize}px`));
            newFontSize = parseFloat(newFontSize.toFixed(2));
            newFontSize = newFontSize <= fontSize ? newFontSize : fontSize;
            setDynamicFontSize(newFontSize);
            setDivScrollLeft(
            getWidth(`${newFontSize}px`) / 2
            )
        }
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
                    className='text-white bg-transparent outline-none transition-all duration-200' 
                    onChange={handleChange}
                    value={swapAmount}
                />
            </div>
        </div>
    )
}

export default DynamicInputBox;