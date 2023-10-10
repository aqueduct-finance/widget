import SwapWidget from "./SwapWidget";
import { useStore } from "../../store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { TestTokens } from "../../utils/erc20s";
import useSuperToken from "./helpers/useSuperToken";
import { useAccount } from "wagmi";
import { decodeRealTimeBalanceRes } from "./helpers/decodeRealTimeBalanceRes";
import { ethers } from "ethers";
import { lightTheme, darkTheme } from "../../theme/defaultThemes";
//import '../../styles/globals.css'; // comment this out when testing with hot reload

interface ExportedWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    chainName?: string;
    outboundToken?: string;
    inboundToken?: string;
    onConnectWalletClick?: () => void;
}

const TWAMMWidget = ({
    theme = darkTheme,
    tokenOption,
    defaultTokens,
    outboundToken,
    inboundToken,
    onConnectWalletClick
}: ExportedWidgetProps) => {

    // init store
    const store = useStore()

    // if specific tokens are specified, select those
    const outboundTokenWithAddress = TestTokens.find(
        token => token.address === outboundToken
    ) || tokenOption && tokenOption.find(
        token => token.address === outboundToken
    );

    const inboundTokenWithAddress =
        TestTokens.find((token) => token.address === inboundToken) ||
        tokenOption && tokenOption.find((token) => token.address === inboundToken);

    useEffect(() => {
        if (outboundTokenWithAddress) {
            store.setOutboundToken(outboundTokenWithAddress);
        }
        if (inboundTokenWithAddress) {
            store.setInboundToken(inboundTokenWithAddress);
        }
    }, [outboundTokenWithAddress, inboundTokenWithAddress]);

    // get account
    const { address } = useAccount();
    
    // realtime balance
    const tokenContractInbound = useSuperToken(store.inboundToken?.address);
    const tokenContractOutbound = useSuperToken(store.outboundToken?.address);
    const inboundFlowRate = useRef(0);
    const outboundFlowRate = useRef(0);

    const ANIMATION_MINIMUM_STEP_TIME = 100;
    const REFRESH_INTERVAL = 300; // 300 * 100 = 30000 ms = 30 s
    const updateTokenPairRealTimeBalanceCallback = useCallback(async () => {
        if (address && (tokenContractInbound?.read || tokenContractOutbound?.read)) {
            const currentTimestampBigNumber = ethers.BigNumber.from(
                new Date().valueOf() // Milliseconds elapsed since UTC epoch, disregards timezone.
            );
            const currentTimestamp = currentTimestampBigNumber.div(1000).toString();
            const futureTimestamp = currentTimestampBigNumber
                .div(1000)
                .add(
                    (REFRESH_INTERVAL *
                        ANIMATION_MINIMUM_STEP_TIME) /
                    1000
                )
                .toString();

            // batch call: get present and future balance for both tokens
            const [presentBalIn, futureBalIn, presentBalOut, futureBalOut] = await Promise.all([
                tokenContractInbound?.read.realtimeBalanceOf([address, currentTimestamp]),
                tokenContractInbound?.read.realtimeBalanceOf([address, futureTimestamp]),
                tokenContractOutbound?.read.realtimeBalanceOf([address, currentTimestamp]),
                tokenContractOutbound?.read.realtimeBalanceOf([address, futureTimestamp]),
            ]);

            const decodedPresentBalIn = decodeRealTimeBalanceRes(presentBalIn);
            const decodedFutureBalIn = decodeRealTimeBalanceRes(futureBalIn);
            const decodedPresentBalOut = decodeRealTimeBalanceRes(presentBalOut);
            const decodedFutureBalOut = decodeRealTimeBalanceRes(futureBalOut);

            // set token0 state
            const initialBalanceIn = decodedPresentBalIn.availableBalance;
            const futureBalanceIn = decodedFutureBalIn.availableBalance;
            store.setInboundTokenBalance(initialBalanceIn);
            inboundFlowRate.current = (futureBalanceIn - initialBalanceIn) / REFRESH_INTERVAL;

            // set token1 state
            const initialBalanceOut = decodedPresentBalOut.availableBalance;
            const futureBalanceOut = decodedFutureBalOut.availableBalance;
            store.setOutboundTokenBalance(initialBalanceOut);
            outboundFlowRate.current = (futureBalanceOut - initialBalanceOut) / REFRESH_INTERVAL;
        }
    }, [address, tokenContractInbound?.address, tokenContractOutbound?.address]);

    // REFRESH(in milliseconds) = REFRESH_INTERVAL * ANIMATION_MINIMUM_STEP_TIME
    const [time, setTime] = useState(REFRESH_INTERVAL);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time + 1);
            if (time >= REFRESH_INTERVAL) {
                setTime(0);
                updateTokenPairRealTimeBalanceCallback();
            }

            // animate frame
            store.incrementOutboundTokenBalance(outboundFlowRate.current);
            store.incrementInboundTokenBalance(inboundFlowRate.current);
        }, ANIMATION_MINIMUM_STEP_TIME);
        return () => {
            clearTimeout(timer);
        };
    }, [inboundFlowRate, outboundFlowRate, time, updateTokenPairRealTimeBalanceCallback]);

    useEffect(() => {
        updateTokenPairRealTimeBalanceCallback();
    }, [address, tokenContractInbound?.address, tokenContractOutbound?.address, updateTokenPairRealTimeBalanceCallback]);

    useEffect(() => {
        if (store.outboundToken) { store.setOutboundToken(store.outboundToken); }
        if (store.inboundToken) { store.setInboundToken(store.inboundToken); }
    }, [address])

    return (
        <div
            className="aqueduct-widget"
        >
            <SwapWidget
                theme={theme}
                tokenOption={tokenOption}
                defaultTokens={defaultTokens}
                onConnectWalletClick={onConnectWalletClick}
            />
        </div>
    )
}

export default TWAMMWidget;

export { lightTheme, darkTheme, useStore as useWidgetStore };