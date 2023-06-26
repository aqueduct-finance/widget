const path = require("path");

module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb-typescript",
        "plugin:@next/next/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: path.resolve(__dirname, "tsconfig.eslint.json"),
    },
    rules: {
        // "react/react-in-jsx-scope": "off",
        // "react/function-component-definition": [
        //             "error",
        //             {
        //                 namedComponents: "arrow-function",
        //                 unnamedComponents: "arrow-function",
        //             },
        //         ],
        // "@typescript-eslint/no-explicit-any": "error",
        // "react/jsx-max-depth": ["error", { "max": 4 }]
    },
};
