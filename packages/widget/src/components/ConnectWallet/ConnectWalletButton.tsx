import React from "react";
import { defaultTheme } from "../../theme/theme";
import { Theme } from "../../theme";
import { ConnectKitButton } from "connectkit";

interface ConnectWalletButtonProps {
    theme?: Theme;
}

const ConnectWalletButton = ({ theme }: ConnectWalletButtonProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <ConnectKitButton.Custom>
            {({ show }) => {
                return (
                    <button onClick={show} className="mt-4 w-full"
                        style={{
                            background: swapTheme.swapButton,
                            boxShadow: swapTheme.swapButtonShadow,
                            color: swapTheme.swapButtonText,
                            fontSize: swapTheme.swapButtonFontSize,
                            padding: swapTheme.swapButtonPadding,
                            fontWeight: swapTheme.titleFontWeight,
                            borderRadius: swapTheme.swapButtonRadius
                        }}>
                        Connect Wallet
                    </button>
                );
            }}
        </ConnectKitButton.Custom>
    );
};

export default ConnectWalletButton;
