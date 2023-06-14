import React, { useRef } from "react";
import Image from "next/image";
import { useStore } from "../../../store";
import { Theme } from "../../../theme";
import { BsPlus } from "react-icons/bs";

interface InputBoxProps {
    swapTheme: Theme;
    setShowModal: (value: boolean) => void;
    setOutbound: (value: boolean) => void;
    valueLength: number;
    fontSize: number;
    width: number;
    swapAmount: number;
    setSwapAmount: (value: number) => void;
    setUseMax: (value: boolean) => void;
    setPreviousLength: (value: number) => void;
    setValueLength: (value: number) => void;
}

const InputBox = ({
    swapTheme,
    setShowModal,
    setOutbound,
    valueLength,
    fontSize,
    width,
    swapAmount,
    setSwapAmount,
    setUseMax,
    setPreviousLength,
    setValueLength
}: InputBoxProps) => {
    const store = useStore();
    const inputRef = useRef(null);

    const activateInput = () => {
        inputRef.current.focus();
    };

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

    return (
        <div
            className={` font-bold w-5/6 flex flex-row items-center justify-center monospace-font transition-all duration-300 cursor-text`}
            style={{ color: swapTheme.primaryText }}
            onClick={activateInput}
        >
            <div className="w-[30px] h-[30px] mb-12 -ml-6 cursor-pointer z-10">
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
            <input className={`${valueLength > 0 ? "text-center" : "text-start"} border-transparent bg-transparent p-2 border-b border-solid focus:border-none focus:outline-none min-w-[15%]`}
                style={{
                    fontSize,
                    width: `${width}%`,
                }}
                type="text"
                ref={inputRef}
                onChange={handleInputChange}
                placeholder="0"
                value={swapAmount}
            />
        </div>
    )
}

export default InputBox;