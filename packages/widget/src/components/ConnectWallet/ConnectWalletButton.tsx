import React from "react";
import { defaultTheme } from "../../theme/theme";
import { Theme } from "../../theme";

interface ConnectWalletButtonProps {
    theme?: Theme;
    onConnectWalletClick?: () => void;
}

const ConnectWalletButton = ({ theme, onConnectWalletClick }: ConnectWalletButtonProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <button 
            onClick={() => {
                onConnectWalletClick && onConnectWalletClick();
            }} 
            className="mt-4 w-full"
            style={{
                background: swapTheme.swapButton,
                boxShadow: swapTheme.swapButtonShadow,
                color: swapTheme.swapButtonText,
                fontSize: swapTheme.swapButtonFontSize,
                padding: swapTheme.swapButtonPadding,
                fontWeight: swapTheme.titleFontWeight,
                borderRadius: swapTheme.swapButtonRadius
            }}
        >
            Connect Wallet
        </button>
    )
};

export default ConnectWalletButton;
