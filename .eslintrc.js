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
        "plugin:import/recommended",
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
        "@typescript-eslint/no-explicit-any": "error",
        "react/jsx-max-depth": ["error", { max: 5 }],
    },
};
