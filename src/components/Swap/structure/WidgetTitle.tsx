import React from "react";
import { Theme } from "../../../theme";
import { TbSettings } from "react-icons/tb";

interface WidgetTitleProps {
    swapTheme: Theme;
}

const WidgetTitle = ({
    swapTheme
}: WidgetTitleProps) => (
    <div className="flex md:pt-5">
        <p style={{
            color: swapTheme.TitleColor,
            fontWeight: swapTheme.titleFontWeight
        }} className={`text-2xl ml-2`}>Swap</p>
        <div className="flex grow" />
    </div>
);

export default WidgetTitle;
