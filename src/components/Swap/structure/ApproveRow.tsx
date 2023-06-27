import React from "react";
import { Theme } from "../../../theme";

interface ApproveRowProps {
    item: {
        title: string;
        data: string;
    };
    index: number;
    swapTheme: Theme;
}

const ApproveRow = ({ item, index, swapTheme }: ApproveRowProps) => {
    return (
        <div
            className="w-full flex flex-row items-start justify-start space-x-5"
            key={index}
            style={{
                color: swapTheme.secondaryText,
            }}
        >
            <h1
                style={{
                    color: swapTheme.TitleColor,
                    fontWeight: swapTheme.accentFontWeight,
                }}
            >
                {item.title}:
            </h1>
            <h1 className="opacity-80">{item.data}</h1>
        </div>
    );
};

export default ApproveRow;
