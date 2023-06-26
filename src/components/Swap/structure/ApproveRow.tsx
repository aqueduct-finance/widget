import React from "react";

const ApproveRow = ({ item, index, swapTheme }) => {
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
                    color: swapTheme.tokenBalance,
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
