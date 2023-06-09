import React, { useState } from 'react'
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
            {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                return (
                    <button onClick={show} className="font-semibold rounded-full mt-4"
                        style={{
                            backgroundColor: swapTheme.swapButton,
                            color: swapTheme.swapButtonText,
                            fontSize: swapTheme.swapButtonFontSize,
                            padding: swapTheme.swapButtonPadding
                        }}>
                        Connect Wallet
                    </button>
                );
            }}
        </ConnectKitButton.Custom>
    )
}

export default ConnectWalletButton;