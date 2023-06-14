// add exports here

// import Theme should be import { Theme } from '@aqueductFinance/widget/theme
// so should be exported from index

export interface Theme {
    TitleColor?: string;
    bgColor?: string;

    primaryBorderRadius?: string;
    secondaryBorderRadius?: string;
    accentBorderRadius?: string;
    borderColor?: string;
    primaryBorderWidth?: string;
    secondaryBorderWidth?: string;

    plusBg?: string;
    plusBorder?: string;
    plusColor?: string;

    useMaxButton?: string;
    useMaxText?: string;

    itemBorderRadius?: string;

    inputDot?: string;

    icons?: string;

    streamLengthText?: string;
    streamLengthBox?: string;
    tokenBox?: string;

    dataDisplayBg?: string;

    swapArrowBox?: string;
    swapArrow?: string;

    primaryText?: string;
    secondaryText?: string;
    accentText?: string;

    primaryFontWeight?: string;
    secondaryFontWeight?: string;

    swapButton?: string;
    swapButtonText?: string;
    swapButtonFontSize?: string;
    swapButtonPadding?: string;

    secondaryMain?: string;

    approveBox?: string;

    loaderInner?: string;
    loaderOuter?: string;
}

export interface Animation {
    primaryDuration?: string;
    secondaryDuration?: string;
    accentDuration?: string;
}
