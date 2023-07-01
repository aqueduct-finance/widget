const path = require("path");

module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
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
        "@typescript-eslint/no-explicit-any": "error",
        "react/jsx-max-depth": ["error", { max: 5 }],
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function",
            },
        ],
    },
};
