import SwapWidget from "./SwapWidget";
import { polygonMumbai } from "wagmi/chains";
import { useStore } from "../../store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { TestTokens } from "../../utils/erc20s";
import Head from "next/head";
import useSuperToken from "./helpers/useSuperToken";
import { useAccount } from "wagmi";
import { decodeRealTimeBalanceRes } from "./helpers/decodeRealTimeBalanceRes";
import { ethers } from "ethers";

const chains = [polygonMumbai];

interface ExportedWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    Web3Key: string;
    chainName?: string;
    width?: string;
    outboundToken?: string;
    inboundToken?: string;
    fontUrl?: string;
}

const TWAMMWidget = ({
    theme,
    tokenOption,
    defaultTokens,
    Web3Key,
    width,
    outboundToken,
    inboundToken,
    fontUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Red+Hat+Mono:wght@700&display=swap"
}: ExportedWidgetProps) => {

    // init store
    const store = useStore()

    // if specific tokens are specified, select those
    const outboundTokenWithAddress = TestTokens.find(
        token => token.address === outboundToken
    ) || tokenOption.find(
        token => token.address === outboundToken
    );

    const inboundTokenWithAddress = TestTokens.find(
        token => token.address === inboundToken
    ) || tokenOption.find(
        token => token.address === inboundToken
    );

    useEffect(() => {
        if (outboundTokenWithAddress) {
            store.setOutboundToken(outboundTokenWithAddress);
        }
        if (inboundTokenWithAddress) {
            store.setInboundToken(inboundTokenWithAddress);
        }
    }, [outboundTokenWithAddress, inboundTokenWithAddress]);



    // get account
    const { address, isConnected, isDisconnected } = useAccount();
    
    // realtime balance
    const tokenContractInbound = useSuperToken(store.inboundToken?.address);
    const tokenContractOutbound = useSuperToken(store.outboundToken?.address);
    const inboundFlowRate = useRef(0);
    const outboundFlowRate = useRef(0);
    /*const underlyingTokenContractInbound = useBalance({ address: address, token: token?.underlyingToken?.address, })//useToken(store.inboundToken?.underlyingToken?.address);
    const underlyingTokenContractOutbound = useToken(store.outboundToken?.underlyingToken?.address);*/
    //const underlyingInBalance = useBalance({ address: address, token: store.inboundToken?.underlyingToken?.address, });
    //const underlyingOutBalance = useBalance({ address: address, token: store.outboundToken?.underlyingToken?.address, });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <>
            <Head>
                <style>
                    @import url({fontUrl});
                </style>
            </Head>
            <SwapWidget
                theme={theme}
                tokenOption={tokenOption}
                defaultTokens={defaultTokens}
                width={width} 
            />
        </>
    )
}

export default TWAMMWidget;