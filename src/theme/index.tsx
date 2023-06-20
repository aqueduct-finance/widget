// add exports here

// import Theme should be import { Theme } from '@aqueductFinance/widget/theme
// so should be exported from index

export interface Theme {
    TitleColor?: string;
    bgColor?: string;

    primaryBorderRadius?: string;
    secondaryBorderRadius?: string;
    accentBorderRadius?: string;
    checkBorderRadius?: string;
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
    accentFontWeight?: string;

    swapButton?: string;
    swapButtonText?: string;
    swapButtonFontSize?: string;
    swapButtonPadding?: string;
    swapButtonRadius?: string;

    secondaryMain?: string;

    approveBox?: string;

    loaderInner?: string;
    loaderOuter?: string;

    textFont?: string;
    numberFont?: string;

    primaryDuration?: string;
    secondaryDuration?: string;
    accentDuration?: string;

    errorColor?: string;
    successColor?: string;
    embeddedLink?: string;
}

export interface Animation {
    primaryDuration?: string;
    secondaryDuration?: string;
    accentDuration?: string;
}
