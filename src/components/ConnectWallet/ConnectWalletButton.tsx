import React from 'react'
import { defaultTheme } from '../../theme/theme'
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
                    <button onClick={show} className="rounded-full mt-4 w-full"
                        style={{
                            backgroundColor: swapTheme.swapButton,
                            color: swapTheme.swapButtonText,
                            fontSize: swapTheme.swapButtonFontSize,
                            padding: swapTheme.swapButtonPadding,
                            fontWeight: swapTheme.titleFontWeight
                        }}>
                        Connect Wallet
                    </button>
                );
            }}
        </ConnectKitButton.Custom>
    )
}

export default ConnectWalletButton;