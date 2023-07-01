import React, { useEffect, useRef, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useAccount, useBalance } from "wagmi";
import { useStore } from "../../store";
import RealTimeBalance from "./helpers/RealTimeBalance";
import { defaultTheme } from "../../theme/theme";
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { TestTokens } from "../../utils/erc20s";
import ConnectWalletButton from "../ConnectWallet/ConnectWalletButton";
import FlowRateSelect from "./structure/FlowRateSelect";
import "../../styles/SwapWidget.module.css";
import TokenModalProvider from "./structure/TokenModal";
import SettingsModalProvider from "./structure/SettingsModal";
import StartSwap from "./structure/StartSwap";
import WidgetTitle from "./structure/WidgetTitle";
import FlowRateContainer from "./structure/FlowRateContainer";
import OutboundBox from "./structure/OutboundBox";
import ActivateSwapArrow from "./structure/ActivateSwapArrow";
import InboundBox from "./structure/InboundBox";
import DataDisplay from "./structure/DataDisplay";
import StreamLengthContainer from "./structure/StreamLengthContainer";
import SwapButton from "./structure/SwapButton";
import AfterTransaction from "./structure/AfterTransaction";
import DynamicInputBox from "./structure/DynamicInputBox";

interface SwapWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    width: string;
}

// FIXME:
// 1. 500 lines (700 lines before removing some unused code) is a potential sign this component is doing too much/is too complex
// 2. Overuse of useEffects. These should all be removed as they are not reacting to an external system - https://react.dev/learn/you-might-not-need-an-effect
// 3. Too many useStates
const SwapWidget = ({
    theme,
    tokenOption,
    defaultTokens = true,
    width = "27rem",
}: SwapWidgetProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const tokenList: TokenTypes[] = defaultTokens
        ? tokenOption
            ? [...TestTokens, ...tokenOption]
            : [...TestTokens]
        : tokenOption
        ? [...tokenOption]
        : [];

    const store = useStore();
    const { address, isConnected, isDisconnected } = useAccount();

    // user input
    // TODO: where is state variable?
    const [, setToken0Price] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [priceMultiple, setPriceMultiple] = useState<BigNumber>(
        BigNumber.from(0)
    );

    const [, setRefreshingPrice] = useState(false);
    const [priceTimeout, setPriceTimeout] = useState<
        NodeJS.Timeout | undefined
    >(undefined);
    const [, setPriceImpact] = useState<number>(0);

    // stream vars
    const swapFlowRate = useRef(BigNumber.from(0));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const expectedFlowRate = useRef(BigNumber.from(0));
    const token0Flow = useRef(BigNumber.from(0));
    const token1Flow = useRef(BigNumber.from(0));
    const userToken0Flow = useRef(BigNumber.from(0));
    const [, setMinBalance] = useState(BigNumber.from(0));
    const [, setDeposit] = useState(BigNumber.from(0));
    const [swapActive, setSwapActive] = useState(false);

    // token modal open/close
    const [showModal, setShowModal] = useState(false);
    const [swapAmount, setSwapAmount] = useState<number>();
    const [dynammicInput, setDynamicInput] = useState("");

    // track inbound and outbound token addresses for grabbing balances
    const [outboundAddress, setOutboundAddress] = useState<
        `0x${string}` | undefined
    >();
    const [inboundAddress, setInboundAddress] = useState<
        `0x${string}` | undefined
    >();

    // check swap validity
    const [overBalance, setOverBalance] = useState(false);
    const [isEntered, setIsEntered] = useState(false);

    // state for stream lengths
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");

    // settings and settings options
    const [showSettings, setShowSettings] = useState(false);
    const [autoWrap, setAutoWrap] = useState(false);
    const [schedule, setSchedule] = useState(false);

    // Approval modal
    const [isBufferAccepted, setIsBufferAccepted] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    // animation track
    const [showAnimation, setShowAnimation] = useState(false);
    const [showMaxAnimation, setShowMaxAnimation] = useState(false);

    // length of 'pay once' swap
    const [length, setLength] = useState(24);

    const [isWallet, setWallet] = useState(false);
    const [outbound, setOutbound] = useState(false);
    const [flowRateDropDown, setFlowRateDropDown] = useState(false);
    const [buffer, setBuffer] = useState(0);
    const [isSwapSuccess, setIsSwapSuccess] = useState(false);

    // buffer confirmation
    const [, setAcceptedBuffer] = useState(false);
    const [outgoingFlowRate, setOutgoingFlowRate] = useState(0);
    const [isSwapFinished, setIsSwapFinished] = useState(false);
    const [outBalance, setOutBalance] = useState<number>(0);
    const [inBalance, setInBalance] = useState<number>(0);

    // user vars
    const [outboundTokenBalance, setOutboundTokenBalance] =
        useState<BigNumber | null>(null);
    const [inboundTokenBalance, setInboundTokenBalance] =
        useState<BigNumber | null>(null);

    const refreshPrice = async () => {
        setRefreshingPrice(true);
        // clear any existing timeouts
        if (priceTimeout) {
            clearTimeout(priceTimeout);
            setPriceTimeout(undefined);
        }

        // set a timeout
        const timeout: NodeJS.Timeout = setTimeout(async () => {
            // calculate new flows
            let calculatedToken0Flow = BigNumber.from(token0Flow.current);
            calculatedToken0Flow = token0Flow.current
                .add(swapFlowRate.current)
                .sub(userToken0Flow.current);

            // calculate token 0 price
            if (token1Flow.current.gt(0)) {
                setToken0Price(
                    parseFloat(calculatedToken0Flow.toString()) /
                        parseFloat(token1Flow.current.toString())
                );
            } else {
                setToken0Price(0);
            }

            if (calculatedToken0Flow.gt(0)) {
                // calculate price multiple
                setPriceMultiple(
                    token1Flow.current
                        .mul(BigNumber.from(2).pow(128))
                        .div(calculatedToken0Flow)
                );

                // calculate price impact
                setPriceImpact(
                    1 -
                        parseFloat(token0Flow.current.toString()) /
                            parseFloat(calculatedToken0Flow.toString())
                );
            } else {
                setPriceMultiple(BigNumber.from(0));
                setPriceImpact(0);
            }

            // calculate deposit
            // assume 1 hr length for deposit // TODO: mainnet is 4 hrs, detect network and adjust deposit period
            const oneHourStream = BigNumber.from(swapFlowRate.current).mul(
                3600
            );
            setDeposit(oneHourStream);

            // had hard time determining min balance, default to 2 hours of streaming for now // TODO: detect network and adjust
            setMinBalance(oneHourStream.mul(2));

            // reset deposit agreement
            setAcceptedBuffer(false);

            // eslint-disable-next-line no-promise-executor-return
            await new Promise((res) => setTimeout(res, 900));
            setRefreshingPrice(false);
        }, 500);

        setPriceTimeout(timeout);
    };

    // refresh spot pricing upon user input
    // FIXME: Remove useEffect
    useEffect(() => {
        const updatePrice = async () => {
            await refreshPrice();
        };

        updatePrice();
    }, [swapFlowRate]);

    const calculateBuffer = ({ expectedFlow }: { expectedFlow: number }) => {
        const bufferTime = 14400;
        const bufferCost = bufferTime * expectedFlow;

        setBuffer(bufferCost);
    };

    const outboundBalance = useBalance({
        address: address,
        token: outboundAddress,
    });

    const inboundBalance = useBalance({
        address: address,
        token: inboundAddress,
    });

    // FIXME: Remove useEffect
    useEffect(() => {
        if (store.inboundToken === store.outboundToken && outbound) {
            store.setInboundToken(null);
        } else if (store.inboundToken === store.outboundToken && !outbound) {
            store.setOutboundToken(null);
        }

        if (store.inboundToken?.underlyingToken) {
            setInboundAddress(store.inboundToken?.underlyingToken.address);
        } else {
            setInboundAddress("0x");
        }
        if (store.outboundToken?.underlyingToken) {
            setOutboundAddress(store.outboundToken?.underlyingToken.address);
        } else {
            setOutboundAddress("0x");
        }

        const lengthInSeconds = length * 3600;

        const expectedOutFlow = swapAmount / lengthInSeconds;

        const expectedOutFlowIndefinite = swapAmount / store.flowrateUnit.value;

        if (swapAmount !== 0 && swapAmount !== undefined) {
            if (store.flowrateUnit?.label !== "Pay Once") {
                setOutgoingFlowRate(expectedOutFlowIndefinite);
                calculateBuffer({ expectedFlow: expectedOutFlowIndefinite });
            } else {
                setOutgoingFlowRate(expectedOutFlow);
                calculateBuffer({ expectedFlow: expectedOutFlow });
            }
        } else {
            setOutgoingFlowRate(0);
            setBuffer(0);
        }

        const intervalId = setInterval(() => {
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            const endDateObj = new Date(now.getTime() + lengthInSeconds * 1000);
            const endDateFormatted = endDateObj.toLocaleDateString();
            const endTimeFormatted = endDateObj.toLocaleTimeString();

            setStartDate(date);
            setStartTime(time);

            if (store.flowrateUnit?.label === "Pay Once") {
                setEndDate(endDateFormatted);
                setEndTime(endTimeFormatted);
            } else {
                setEndDate("Not scheduled");
                setEndTime("");
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [
        store.inboundToken,
        store.outboundToken,
        swapAmount,
        length,
        store.flowrateUnit,
        store.flowrateUnit,
    ]);

    // FIXME: Remove useEffect
    useEffect(() => {
        if (
            store.inboundToken &&
            store.outboundToken &&
            swapAmount > 0 &&
            parseInt(outboundBalance.data?.formatted) > 0
        ) {
            setIsEntered(true);
        } else {
            setIsEntered(false);
        }

        if (
            (parseFloat(dynammicInput) >
                parseFloat(outboundBalance.data?.formatted) +
                    parseFloat(
                        outboundTokenBalance
                            ? ethers.utils.formatEther(outboundTokenBalance)
                            : "0"
                    ) &&
                store.outboundToken) ||
            (outboundBalance.data?.formatted === undefined &&
                store.outboundToken)
        ) {
            setOverBalance(true);
        } else {
            setOverBalance(false);
        }

        if (isConnected && !isDisconnected) {
            setWallet(true);
        } else {
            setWallet(false);
        }
    }, [
        outboundBalance,
        inboundBalance,
        store.outboundToken,
        store.inboundToken,
        dynammicInput,
        isConnected,
        isDisconnected,
    ]);

    useEffect(() => {
        setOutBalance(0);
    }, [store.outboundToken]);

    useEffect(() => {
        setInBalance(0);
    }, [store.inboundToken]);

    return (
        <div
            className="relative flex flex-col px-7 pb-7 pt-12 z-10 overflow-hidden"
            style={{
                width: width,
                fontFamily: swapTheme.textFont,
            }}
        >
            <RealTimeBalance
                token={store.inboundToken}
                setBalance={setInboundTokenBalance}
                balance={inboundTokenBalance}
                setunWrapped={setInBalance}
            />
            <RealTimeBalance
                token={store.outboundToken}
                setBalance={setOutboundTokenBalance}
                balance={outboundTokenBalance}
                setunWrapped={setOutBalance}
            />
            <div className="absolute overflow-hidden 2bg-red-500/25 top-10 left-[0.5rem] right-[0.5rem] bottom-[0.5rem] rounded-gc-3xl z-50 pointer-events-none">
                <TokenModalProvider
                    tokenList={tokenList}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    outbound={outbound}
                    theme={swapTheme}
                />
                <SettingsModalProvider
                    showSettings={showSettings}
                    setShowSettings={setShowSettings}
                    theme={swapTheme}
                    autoWrap={autoWrap}
                    setAutoWrap={setAutoWrap}
                    schedule={schedule}
                    setSchedule={setSchedule}
                />
                <StartSwap
                    theme={swapTheme}
                    swapActive={swapActive}
                    setSwapActive={setSwapActive}
                    setIsApproved={setIsApproved}
                    setIsBufferAccepted={setIsBufferAccepted}
                    flowrateUnit={store.flowrateUnit}
                    outboundToken={store.outboundToken}
                    inboundToken={store.inboundToken}
                    swapAmount={swapAmount}
                    startDate={startDate}
                    startTime={startTime}
                    endDate={endDate}
                    endTime={endTime}
                    autoWrap={autoWrap}
                    isBufferAccepted={isBufferAccepted}
                    isApproved={isApproved}
                    outgoingFlowRate={outgoingFlowRate}
                    buffer={buffer}
                    setIsSwapSuccess={setIsSwapSuccess}
                    setIsSwapFinished={setIsSwapFinished}
                />
                <AfterTransaction
                    swapTheme={swapTheme}
                    isSwapFinished={isSwapFinished}
                    isSwapSuccess={isSwapSuccess}
                    setSwapActive={setSwapActive}
                    setIsApproved={setIsApproved}
                    setIsBufferAccepted={setIsBufferAccepted}
                    setIsSwapFinished={setIsSwapFinished}
                    outgoingFlowRate={outgoingFlowRate}
                    endDate={endDate}
                    setSwapAmount={setSwapAmount}
                />
            </div>
            <div
                className="absolute top-[0.2rem] bottom-[0.2rem] left-[0.2rem] right-[0.2rem] -z-10 pointer-events-none overflow-hidden"
                style={{
                    backgroundColor: swapTheme.bgColor,
                    borderColor: swapTheme.borderColor,
                    borderWidth: swapTheme.primaryBorderWidth,
                    borderRadius: swapTheme.primaryBorderRadius,
                }}
            />
            <WidgetTitle
                swapTheme={swapTheme}
                setShowSettings={setShowSettings}
            />
            <div className="w-full h-[104px] flex items-center justify-center monospace-font font-bold mt-8">
                <DynamicInputBox
                    swapTheme={swapTheme}
                    setShowModal={setShowModal}
                    setOutbound={setOutbound}
                    swapAmount={swapAmount}
                    paddingPercentage={0.15}
                    setSwapAmount={setSwapAmount}
                    setDynamicInput={setDynamicInput}
                    dynamicInput={dynammicInput}
                />
            </div>
            <div className="mt-6">
                <FlowRateSelect
                    dropdownValue={store.flowrateUnit}
                    theme={swapTheme}
                    setFlowRateDropDown={setFlowRateDropDown}
                    flowRateDropDown={flowRateDropDown}
                />
                <FlowRateContainer
                    swapTheme={swapTheme}
                    isEntered={isEntered}
                    flowRateDropDown={flowRateDropDown}
                    setFlowRateDropDown={setFlowRateDropDown}
                />
            </div>
            <OutboundBox
                outboundBalance={outBalance.toString()}
                swapTheme={swapTheme}
                showMaxAnimation={showMaxAnimation}
                setShowMaxAnimation={setShowMaxAnimation}
                setShowModal={setShowModal}
                setOutbound={setOutbound}
                setSwapAmount={setSwapAmount}
                setDynamicInput={setDynamicInput}
            />
            <ActivateSwapArrow
                swapTheme={swapTheme}
                overBalance={overBalance}
                isEntered={isEntered}
                setSwapActive={setSwapActive}
            />
            <div
                className="flex flex-col ease-in-out duration-300 transition-all"
                style={{
                    backgroundColor: swapTheme.streamLengthBox,
                    borderRadius: swapTheme.secondaryBorderRadius,
                }}
            >
                <InboundBox
                    swapTheme={swapTheme}
                    inboundBalance={inBalance.toString()}
                    setShowModal={setShowModal}
                    setOutbound={setOutbound}
                    isEntered={isEntered}
                />
                <DataDisplay
                    swapTheme={swapTheme}
                    isEntered={isEntered}
                    startDate={startDate}
                    startTime={startTime}
                    endDate={endDate}
                    endTime={endTime}
                    outgoingFlowRate={outgoingFlowRate}
                />
            </div>
            <StreamLengthContainer
                swapTheme={swapTheme}
                setLength={setLength}
                length={length}
            />
            {isWallet ? (
                <SwapButton
                    swapTheme={swapTheme}
                    overBalance={overBalance}
                    isEntered={isEntered}
                    showAnimation={showAnimation}
                    setShowAnimation={setShowAnimation}
                    setSwapActive={setSwapActive}
                />
            ) : (
                <ConnectWalletButton theme={theme} />
            )}
        </div>
    );
};

export default SwapWidget;
