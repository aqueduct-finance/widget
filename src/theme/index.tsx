// add exports here

// import Theme should be import { Theme } from '@aqueductFinance/widget/theme
// so should be exported from index

export interface Theme {
    TitleColor?: string;
    bgColor?: string;

    borderRadius?: string;
    borderWidth?: string;
    borderColor?: string;

    plusBg?: string;
    plusBorder?: string;
    plusColor?: string;

    useMaxButton?: string;
    useMaxText?: string;

    tokenBalance?: string;
    icons?: string;

    streamLengthText?: string;
    streamLengthBox?: string;
    tokenBox?: string;

    primaryText?: string;
    secondaryText?: string;

    swapButton?: string;
    swapButtonText?: string;
    swapButtonFontSize?: string;
    swapButtonPadding?: string;
}