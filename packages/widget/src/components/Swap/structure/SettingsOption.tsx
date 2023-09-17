import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Theme } from "../../../theme";

interface SettingsOptionProps {
    item: {
        title: string;
        state: boolean;
        setState: (value: boolean) => void;
    };
    index: number;
    swapTheme: Theme;
}

const SettingsOption = ({ item, index, swapTheme }: SettingsOptionProps) => {
    return (
        <div
            className={`flex flex-row ease-in-out px-4 py-4 mt-5`}
            style={{
                borderColor: swapTheme.borderColor,
                borderBottomWidth:
                    index === 1 || index === 2
                        ? swapTheme.primaryBorderWidth
                        : "",
                borderTopWidth: index === 1 ? swapTheme.primaryBorderWidth : "",
                transitionDuration: swapTheme.secondaryDuration,
            }}
            key={index}
        >
            <div className="flex flex-row w-full items-center px-1 justify-start space-x-3">
                <h1
                    className="text-xl cursor-default"
                    style={{
                        color: swapTheme.primaryText,
                        fontFamily: swapTheme.textFont,
                        fontWeight: swapTheme.secondaryFontWeight,
                    }}
                >
                    {item.title}
                </h1>
                <IoMdInformationCircleOutline
                    className="mt-0.5 cursor-pointer"
                    style={{
                        color: swapTheme.accentText,
                    }}
                />
            </div>
            <div
                className={`w-[80px] h-[35px] px-1 py-1 items-start flex rounded-2xl ease-in-out cursor-pointer`}
                style={{
                    backgroundColor: item.state
                        ? swapTheme.swapButton
                        : swapTheme.useMaxButton,
                    transitionDuration: swapTheme.primaryDuration,
                }}
                onClick={() => {
                    item.setState(!item.state);
                }}
            >
                <div
                    className={`${
                        item.state ? "translate-x-7" : "translate-x-0"
                    } w-[30px] h-full rounded-full transition-all`}
                    style={{
                        backgroundColor: item.state
                            ? swapTheme.primaryText
                            : swapTheme.accentText,
                        transitionDuration: swapTheme.primaryDuration,
                    }}
                />
            </div>
        </div>
    );
};

export default SettingsOption;
