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
        <div className='w-full flex flex-row items-start justify-start space-x-5' key={index} >
            <p
                className='font-light'
                style={{
                    //fontWeight: swapTheme.accentFontWeight,
                    color: swapTheme.accentText,
                }}
            >
                {item.title}:
            </p>
            <p 
                style={{
                    color: swapTheme.primaryText,
                }}
            >
                {item.data}
            </p>
        </div>
    );
};

export default ApproveRow;
