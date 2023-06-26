import { Theme } from "./index";

// add exports here

// import Theme should be import { Theme } from '@aqueductFinance/widget/theme
// so should be exported from index

export const lightTheme: Theme = {
    TitleColor: "#000000",
    bgColor: "#FFFFFF",

    primaryBorderWidth: "2px",
    secondaryBorderWidth: "2px",

    primaryBorderRadius: "3rem",
    secondaryBorderRadius: "0.9rem",
    accentBorderRadius: "12px",

    borderColor: "#262626",

    plusBg: "rgb(255 255 255 / 0.1)",
    plusBorder: "rgb(255 255 255 / 0.25)",
    plusColor: "rgb(255 255 255 / 0.5)",

    useMaxButton: "#2A2A2A",
    useMaxText: "#ffffff",

    itemBorderRadius: "9999px",

    inputDot: "#FFFFFF",

    accentText: "rgb(255 255 255 / 0.5)",
    icons: "rgb(255 255 255 / 0.75)",

    streamLengthText: "rgb(255 255 255 / 0.75)",
    streamLengthBox: "#121212",
    tokenBox: "#121212",

    dataDisplayBg: "#0D0D0D",

    primaryText: "#FFFFFF",
    secondaryText: "#FFFFFF",

    primaryFontWeight: "500",
    secondaryFontWeight: "500",

    swapButton: "#0460CE",
    swapButtonText: "#FFFFFF",
    swapButtonFontSize: "22px",
    swapButtonPadding: "0.75rem",

    secondaryMain: "rgba(225, 123, 247, 0.6)",

    approveBox: "#121212",

    loaderInner: "rgb(255 255 255 / 0.5)",
    loaderOuter: "#E17BF7",
};

export const darkTheme: Theme = {
    TitleColor: "#ffffff",
    bgColor: "#000000",

    primaryBorderWidth: "2px",
    secondaryBorderWidth: "2px",

    primaryBorderRadius: "3rem",
    secondaryBorderRadius: "0.9rem",
    accentBorderRadius: "8px",
    checkBorderRadius: "6px",

    borderColor: "#262626",

    plusBg: "rgb(255 255 255 / 0.1)",
    plusBorder: "rgb(255 255 255 / 0.25)",
    plusColor: "rgb(255 255 255 / 0.5)",

    useMaxButton: "#2A2A2A",
    useMaxText: "#ffffff",

    itemBorderRadius: "9999px",

    inputDot: "#FFFFFF",

    accentText: "rgb(255 255 255 / 0.5)",
    icons: "rgb(255 255 255 / 0.75)",

    streamLengthText: "rgb(255 255 255 / 0.75)",
    streamLengthBox: "#121212",
    tokenBox: "#121212",

    dataDisplayBg: "#0D0D0D",

    primaryText: "#FFFFFF",
    secondaryText: "#FFFFFF",

    primaryFontWeight: "700",
    secondaryFontWeight: "500",
    accentFontWeight: "700",

    swapButton: "#0460CE",
    swapButtonText: "#FFFFFF",
    swapButtonFontSize: "22px",
    swapButtonPadding: "0.75rem",

    secondaryMain: "rgba(225, 123, 247, 0.6)",

    approveBox: "#121212",

    loaderInner: "rgb(255 255 255 / 0.5)",
    loaderOuter: "#E17BF7",

    textFont: "'Poppins', sans-serif",
    numberFont: "'Red Hat Mono', monospace",

    primaryDuration: "300ms",
    secondaryDuration: "100ms",
    accentDuration: "200ms",

    errorColor: "#EF4444",
    successColor: "#49DE80",
    embeddedLink: "#3B82F6",
};
