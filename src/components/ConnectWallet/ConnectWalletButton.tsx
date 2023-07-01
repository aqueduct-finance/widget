import React from "react";
import { ConnectKitButton } from "connectkit";
import { defaultTheme } from "../../theme/theme";
import { Theme } from "../../theme";

interface ConnectWalletButtonProps {
    theme: Theme;
}

const ConnectWalletButton = ({ theme }: ConnectWalletButtonProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <ConnectKitButton.Custom>
            {({ show }) => (
                <button
                    type="button"
                    onClick={show}
                    className="font-semibold rounded-full mt-4"
                    style={{
                        backgroundColor: swapTheme.swapButton,
                        color: swapTheme.swapButtonText,
                        fontSize: swapTheme.swapButtonFontSize,
                        padding: swapTheme.swapButtonPadding,
                    }}
                >
                    Connect Wallet
                </button>
            )}
        </ConnectKitButton.Custom>
    );
};

export default ConnectWalletButton;
