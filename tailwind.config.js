const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aqueductBlue: "#0460CE",
                warningYellow: "#FDB833",
                darkBlue: "#0e2138",
                blueBlack: "#0b1521",
                blueBlack2: "#060d14",
                daiYellow: "#F5AC37",
                usdcBlue: "#2775CA",
                ethBlue: "#00ABEE",
                ethPink: "#E7018A",
                highlightGray: "#262626",
                lightGray: "#808080",
                darkGray: "#121212",
            },
            screens: {
                xs: "475px",
                "3xl": "2000px",
                ...defaultTheme.screens,
            },
            scrollbar: {
                // The width of the scrollbar
                width: "6px",
                // The color of the scrollbar track
                track: "transparent",
                // The color of the scrollbar thumb
                thumb: "#4B5563",
            },
        },
        fontFamily: {
            poppins: ["Poppins", "sans-serif"],
            "redhat-mono": ['"Red Hat Mono"', "monospace"],
        },
        animation: {
            "spin-slow": "spin 2.5s linear infinite",
            "fade-in": "fade-in 300ms ease-in-out",
        },
    },
    plugins: [],
};
