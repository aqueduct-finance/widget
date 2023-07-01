import React, { useEffect, useState } from "react";
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
import { GenericDropdownOption } from "../../types/GenericDropdownOption";

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
    // TODO: where is state variable

    // stream vars
    const [endFlow, setEndFlow] = useState<GenericDropdownOption>();
    const [swapFlowRate, setSwapFlowRate] = useState("");
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

    const [isWallet, setWallet] = useState(false);
    const [outbound, setOutbound] = useState(false);
    const [flowRateDropDown, setFlowRateDropDown] = useState(false);
    const [buffer, setBuffer] = useState(0);
    const [isSwapSuccess, setIsSwapSuccess] = useState(false);

    // buffer confirmation
    const [outgoingFlowRate, setOutgoingFlowRate] = useState(0);
    const [isSwapFinished, setIsSwapFinished] = useState(false);
    const [outBalance, setOutBalance] = useState<number>(0);
    const [inBalance, setInBalance] = useState<number>(0);
    const [tx, setTx] = useState("");

    // user vars
    const [outboundTokenBalance, setOutboundTokenBalance] =
        useState<BigNumber | null>(null);
    const [inboundTokenBalance, setInboundTokenBalance] =
        useState<BigNumber | null>(null);

    const calculateBuffer = ({ expectedFlow }: { expectedFlow: number }) => {
        const bufferTime = 14400;
        const bufferCost = bufferTime * expectedFlow;

        setBuffer(bufferCost);
    };

    const outboundBalance = useBalance({
        address,
        token: outboundAddress,
    });

    const inboundBalance = useBalance({
        address,
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

        const lengthInSeconds = store.payOnceLength * 3600;

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
        store.payOnceLength,
        store.flowrateUnit,
        store.flowrateUnit,
    ]);

    // FIXME: Remove useEffect
    useEffect(() => {
        if (
            store.inboundToken &&
            store.outboundToken &&
            swapAmount > 0 &&
            outBalance > 0
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

    const [newOut, setNewOut] = useState(false);
    const [newIn, setNewIn] = useState(false);

    useEffect(() => {
        setNewOut(true);
        setOutBalance(0);
    }, [store.outboundToken]);

    useEffect(() => {
        setNewIn(true);
        setInBalance(0);
    }, [store.inboundToken]);

    return (
        <div
            className="relative flex flex-col px-7 pb-7 pt-12 z-10 overflow-hidden"
            style={{
                width,
                fontFamily: swapTheme.textFont,
            }}
        >
            <RealTimeBalance
                token={store.inboundToken}
                setBalance={setInboundTokenBalance}
                balance={inboundTokenBalance}
                setunWrapped={setInBalance}
                setIsNew={setNewIn}
                isNew={newIn}
            />
            <RealTimeBalance
                token={store.outboundToken}
                setBalance={setOutboundTokenBalance}
                balance={outboundTokenBalance}
                setunWrapped={setOutBalance}
                setIsNew={setNewOut}
                isNew={newOut}
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
                    setIsEntered={setIsEntered}
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
                    swapFlowRate={swapFlowRate}
                    setTx={setTx}
                    outBalance={outBalance}
                    setEndFlow={setEndFlow}
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
                    tx={tx}
                    endFlow={endFlow}
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
                    setSwapFlowRate={setSwapFlowRate}
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
            <StreamLengthContainer swapTheme={swapTheme} />
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
