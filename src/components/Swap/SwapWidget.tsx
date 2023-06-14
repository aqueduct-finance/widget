import React, { useEffect, useRef, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useBalance, useNetwork, usePublicClient } from "wagmi";
import getPoolAddress from "./helpers/getPool";
import { useStore } from "../../store";
import RealTimeBalance from "./helpers/RealTimeBalance";
import AnimatedInputOverlay, {
    AnimatedInputRef,
} from "./structure/AnimatedInputOverlay"
import { defaultTheme } from '../../theme/theme'
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { TestTokens } from "../../utils/erc20s";
import 'tailwindcss/tailwind.css'
import ConnectWalletButton from "../ConnectWallet/ConnectWalletButton";
import FlowRateSelect from "./structure/FlowRateSelect";
import '../../styles/SwapWidget.module.css'
import TokenModalProvider from "./structure/TokenModal";
import SettingsModalProvider from "./structure/SettingsModal";
import StartSwap from "./structure/StartSwap";
import WidgetTitle from "./structure/WidgetTitle";
import InputBox from "./structure/InputBox";
import FlowRateContainer from "./structure/FlowRateContainer";
import OutboundBox from "./structure/OutboundBox";
import ActivateSwapArrow from "./structure/ActivateSwapArrow";
import InboundBox from "./structure/InboundBox";
import DataDisplay from "./structure/DataDisplay";
import StreamLengthContainer from "./structure/StreamLengthContainer";
import SwapButton from "./structure/SwapButton";


interface SwapWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
}

const SwapWidget = ({ theme, tokenOption, defaultTokens = true }: SwapWidgetProps) => {

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const tokenList: TokenTypes[] = defaultTokens ? tokenOption ? [...TestTokens, ...tokenOption] :
        [...TestTokens] : tokenOption ? [...tokenOption] : [];

    const store = useStore();
    const provider = usePublicClient();
    const { chain } = useNetwork();
    const { address, isConnected, isDisconnected } = useAccount();

    // user input
    const [displayedSwapFlowRate, setDisplayedSwapFlowRate] =
        useState<string>("");
    const [displayedExpectedFlowRate, setDisplayedExpectedFlowRate] =
        useState<string>("");
    //const [swapFlowRate, setSwapFlowRate] = useState("");
    //const [expectedFlowRate, setExpectedFlowRate] = useState("");
    const [, setToken0Price] = useState(0);
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
    const expectedFlowRate = useRef(BigNumber.from(0));
    const token0Flow = useRef(BigNumber.from(0));
    const token1Flow = useRef(BigNumber.from(0));
    const userToken0Flow = useRef(BigNumber.from(0));
    const [, setMinBalance] = useState(BigNumber.from(0));
    const [, setDeposit] = useState(BigNumber.from(0));
    const [swapActive, setSwapActive] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)

    // token modal open/close
    const [showModal, setShowModal] = useState(false);
    const [swapAmount, setSwapAmount] = useState<number>();

    // outbound token input box
    const [width, setWidth] = useState(20)
    const [fontSize, setFontSize] = useState(72);
    const [previousLength, setPreviousLength] = useState(0);
    const [valueLength, setValueLength] = useState(0)
    const [useMax, setUseMax] = useState(false)

    // track inbound and outbound token addresses for grabbing balances
    const [outboundAddress, setOutboundAddress] = useState<`0x${string}` | undefined>();
    const [inboundAddress, setInboundAddress] = useState<`0x${string}` | undefined>();

    // check swap validity
    const [overBalance, setOverBalance] = useState(false)
    const [isEntered, setIsEntered] = useState(false)

    // additional components rendered if isPayOnce is true
    const [isPayOnce, setIsPayOnce] = useState(true)

    // state for stream lengths
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    // settings and settings options
    const [showSettings, setShowSettings] = useState(false)
    const [autoWrap, setAutoWrap] = useState(false);
    const [importTokens, setImportTokens] = useState(false);
    const [schedule, setSchedule] = useState(false);

    // Approval modal
    const [isBufferAccepted, setIsBufferAccepted] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    // animation track
    const [showAnimation, setShowAnimation] = useState(false)
    const [showMaxAnimation, setShowMaxAnimation] = useState(false)

    // length of 'pay once' swap
    const [length, setLength] = useState(24);

    const [isWallet, setWallet] = useState(false)
    const [outbound, setOutbound] = useState(false)
    const [flowRateDropDown, setFlowRateDropDown] = useState(false);


    // buffer confirmation
    const [, setAcceptedBuffer] = useState(false);

    // user vars
    const [outboundTokenBalance, setOutboundTokenBalance] = useState(
        BigNumber.from(0)
    );
    const [inboundTokenBalance, setInboundTokenBalance] = useState(
        BigNumber.from(0)
    );

    // input refs
    const tokenSwapFlowRateRef = useRef<AnimatedInputRef>(null);
    const tokenExpectedFlowRateRef = useRef<AnimatedInputRef>(null);
    const usdSwapFlowRateRef = useRef<AnimatedInputRef>(null);
    const usdExpectedFlowRateRef = useRef<AnimatedInputRef>(null);

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

    /*

    useEffect(() => {
        // calculate expected outgoing flowrate
        if (swapAmount !== 0 && swapAmount !== undefined) {
            setDisplayedExpectedFlowRate(
                ethers.utils.formatEther(
                    BigNumber.from(swapAmount)
                        .mul(priceMultiple)
                        .mul(store.flowrateUnit.value)
                        .div(BigNumber.from(2).pow(128))
                )
            );
        } else {
            setDisplayedExpectedFlowRate("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceMultiple]);

*/
    /*
    // update vars when tokens change
    useEffect(() => {
        const updateFlowVars = async () => {
            const token0Address = store.outboundToken?.address ?? "";
            const token1Address = store.inboundToken?.address ?? "";

            if (store.inboundToken && store.outboundToken) {
                try {
                    const poolAddress = getPoolAddress(
                        store.inboundToken.value,
                        store.outboundToken?.value
                    );
                    setPoolExists(true);

                    // init sf framework
                    const sf = await Framework.create({
                        chainId:
                            (provider &&
                                provider.chains &&
                                provider.chains[0].id) ??
                            goerliChainId,
                        provider, // problem with updated wagmi and usePublicClient()
                    });

                    // get flows
                    token0Flow.current = BigNumber.from(
                        await sf.cfaV1.getNetFlow({
                            superToken: token0Address,
                            account: poolAddress,
                            providerOrSigner: provider,
                        })
                    );
                    token1Flow.current = BigNumber.from(
                        await sf.cfaV1.getNetFlow({
                            superToken: token1Address,
                            account: poolAddress,
                            providerOrSigner: provider,
                        })
                    );

                    // get existing user flows
                    if (address) {
                        userToken0Flow.current = BigNumber.from(
                            (
                                await sf.cfaV1.getFlow({
                                    superToken: token0Address,
                                    sender: address,
                                    receiver: poolAddress,
                                    providerOrSigner: provider,
                                })
                            ).flowRate
                        );
                        userToken1Flow.current = BigNumber.from(
                            (
                                await sf.cfaV1.getFlow({
                                    superToken: token1Address,
                                    sender: address,
                                    receiver: poolAddress,
                                    providerOrSigner: provider,
                                })
                            ).flowRate
                        );
                    }

                    await refreshPrice();
                } catch (err) {
                    setRefreshingPrice(false);
                    setPoolExists(false);
                }
            }
        };

        if (store.inboundToken && store.outboundToken) {
            updateFlowVars();
        }
        // TODO: Assess missing dependency array values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.inboundToken, store.outboundToken, address, chain]);

    */

    // refresh spot pricing upon user input
    useEffect(() => {
        const updatePrice = async () => {
            await refreshPrice();
        };

        updatePrice();

        // TODO: Assess missing dependency array values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swapFlowRate]);

    const calculateExpectedFlowRate = async (
        flowRate: string
    ) => {
        // set new swap flow rate
        swapFlowRate.current =
            flowRate === ""
                ? BigNumber.from(0)
                : ethers.utils
                    .parseUnits(flowRate, "ether")
                    .div(store.flowrateUnit.value);

        // clear any existing timeouts
        if (priceTimeout) {
            clearTimeout(priceTimeout);
            setPriceTimeout(undefined);
        }

        // set a timeout
        const timeout: NodeJS.Timeout = setTimeout(async () => {
            // refresh the price
            await refreshPrice();

            // calculate the expected output
            const output = swapFlowRate.current
                .mul(priceMultiple)
                .mul(store.flowrateUnit.value)
                .div(BigNumber.from(2).pow(128));
            const outputString = ethers.utils.formatEther(output);

            expectedFlowRate.current = output;
            if (tokenExpectedFlowRateRef.current) {
                tokenExpectedFlowRateRef.current.setValue(outputString);
            }
        }, 500);

        setPriceTimeout(timeout);
    };

    const calculateSwapFlowRate = (flowRate: string, isUsd?: boolean) => {
        // set new expected flow rate and calculate needed swap flow rate
        expectedFlowRate.current = ethers.utils
            .parseUnits(flowRate, "ether")
            .div(store.flowrateUnit.value);

        // clear any existing timeouts
        if (priceTimeout) {
            clearTimeout(priceTimeout);
            setPriceTimeout(undefined);
        }

        // set a timeout
        const timeout: NodeJS.Timeout = setTimeout(async () => {
            if (expectedFlowRate.current.gt(0)) {
                swapFlowRate.current = token0Flow.current
                    .sub(userToken0Flow.current)
                    .mul(BigNumber.from(10).pow(18))
                    .div(
                        token1Flow.current
                            .mul(BigNumber.from(10).pow(18))
                            .div(expectedFlowRate.current)
                            .sub(BigNumber.from(10).pow(18))
                    );
            } else {
                swapFlowRate.current = BigNumber.from(0);
            }

            // refresh the price
            refreshPrice();

            // calculate the expected output
            const outputString = ethers.utils.formatEther(
                swapFlowRate.current.mul(store.flowrateUnit.value)
            );

            if (tokenSwapFlowRateRef.current) {
                tokenSwapFlowRateRef.current.setValue(outputString);
            }

        }, 500);

        setPriceTimeout(timeout);
    };

    const outboundBalance = useBalance({
        address: address,
        token: outboundAddress,
    })

    const inboundBalance = useBalance({
        address: address,
        token: inboundAddress,
    })

    const changeSize = () => {
        setFontSize((prevFontSize) => {
            if (previousLength > valueLength) {
                return prevFontSize * 1.13;
            } else {
                return prevFontSize * 0.87;
            }
        });
    };

    const onUseMax = () => {
        if (valueLength >= 7) {
            setFontSize(72 * 0.9 ** valueLength);
        }
        setWidth(95);
    }

    const [outgoingFlowRate, setOutgoingFlowRate] = useState(0);

    useEffect(() => {
        if (valueLength >= 7 && !useMax) {
            changeSize();
        } else if (useMax) {
            onUseMax();
        } else {
            setFontSize(72);
        }

        if (previousLength < valueLength && width < 105 && width >= 0 && !useMax) {
            setWidth((prevWidth) => prevWidth + 15);
        } else if (previousLength > valueLength && width > 20 && valueLength <= 5) {
            setWidth((prevWidth) => prevWidth - 15);
        }
    }, [valueLength, previousLength, swapAmount]);

    useEffect(() => {
        if (isConnected && !isDisconnected) {
            setWallet(true)
        } else {
            setWallet(false)
        }
    }, [isConnected, isDisconnected])

    useEffect(() => {
        if (store.inboundToken === store.outboundToken && outbound) {
            store.setInboundToken(null)
        } else if (store.inboundToken === store.outboundToken && !outbound) {
            store.setOutboundToken(null)
        }

        if (store.inboundToken?.underlyingToken) {
            setInboundAddress(store.inboundToken?.underlyingToken.address)
        } else {
            setInboundAddress("0x")
        }
        if (store.outboundToken?.underlyingToken) {
            setOutboundAddress(store.outboundToken?.underlyingToken.address)
        } else {
            setOutboundAddress("0x");
        }

        const lengthInSeconds = length * 3600;

        const expectedOutFlow = swapAmount / lengthInSeconds;

        const expectedOutFlowIndefinite = swapAmount / store.flowrateUnit.value

        if (swapAmount !== 0 && swapAmount !== undefined) {
            if (!isPayOnce) {
                setOutgoingFlowRate(expectedOutFlowIndefinite)
            } else {
                setOutgoingFlowRate(expectedOutFlow);
            }
        } else {
            setOutgoingFlowRate(0)
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

            if (isPayOnce) {
                setEndDate(endDateFormatted);
                setEndTime(endTimeFormatted);
            } else {
                setEndDate("Not scheduled")
                setEndTime("")
            }
        }, 1000);

        return () => clearInterval(intervalId);

    }, [store.inboundToken, store.outboundToken, swapAmount, length, isPayOnce, store.flowrateUnit])

    useEffect(() => {
        if (store.inboundToken &&
            store.outboundToken &&
            swapAmount > 0 &&
            parseInt(outboundBalance.data?.formatted) > 0) {
            setIsEntered(true)
        } else {
            setIsEntered(false)
        }

        if (
            swapAmount > parseFloat(outboundBalance.data?.formatted) &&
            store.outboundToken ||
            outboundBalance.data?.formatted === undefined && store.outboundToken
        ) {
            setOverBalance(true);
        } else {
            setOverBalance(false);
        }
    }, [outboundBalance, inboundBalance, store.outboundToken, store.inboundToken])


    return (
        <div className="relative flex flex-col px-6 pb-6 pt-12 z-10 w-[27rem]">
            <RealTimeBalance
                token={store.inboundToken}
                setBalance={setInboundTokenBalance}
            />
            <RealTimeBalance
                token={store.outboundToken}
                setBalance={setOutboundTokenBalance}
            />
            <div className="absolute overflow-hidden 2bg-red-500/25 top-10 left-[0.5rem] right-[0.5rem] bottom-[0.5rem] rounded-gc-3xl z-50 pointer-events-none">
                <TokenModalProvider
                    tokenList={tokenList}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    outbound={outbound}
                />
                <SettingsModalProvider
                    showSettings={showSettings}
                    setShowSettings={setShowSettings}
                    theme={swapTheme}
                    autoWrap={autoWrap}
                    setAutoWrap={setAutoWrap}
                    importTokens={importTokens}
                    setImportTokens={setImportTokens}
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
                />
            </div>
            <div className="absolute top-[0.2rem] bottom-[0.2rem] left-[0.2rem] right-[0.2rem] -z-10 pointer-events-none" style={{
                backgroundColor: swapTheme.bgColor,
                borderColor: swapTheme.borderColor,
                borderWidth: swapTheme.primaryBorderWidth,
                borderRadius: swapTheme.primaryBorderRadius
            }}
            />
            <WidgetTitle
                swapTheme={swapTheme}
                setShowSettings={setShowSettings}
            />
            <div className="relative w-full flex items-center justify-center h-[104px] overflow-hidden mt-8">
                <InputBox
                    swapTheme={swapTheme}
                    setShowModal={setShowModal}
                    setOutbound={setOutbound}
                    valueLength={valueLength}
                    fontSize={fontSize}
                    width={width}
                    swapAmount={swapAmount}
                    setSwapAmount={setSwapAmount}
                    setUseMax={setUseMax}
                    setPreviousLength={setPreviousLength}
                    setValueLength={setValueLength}
                />
            </div>
            <div className="mt-6">
                <FlowRateSelect
                    dropdownValue={store.flowrateUnit}
                    theme={swapTheme}
                    setIsPayOnce={setIsPayOnce}
                    setFlowRateDropDown={setFlowRateDropDown}
                    flowRateDropDown={flowRateDropDown}
                />
                <FlowRateContainer
                    swapTheme={swapTheme}
                    isPayOnce={isPayOnce}
                    isEntered={isEntered}
                    flowRateDropDown={flowRateDropDown}
                    setFlowRateDropDown={setFlowRateDropDown}
                />
            </div>
            <OutboundBox
                outboundWrappedBalance={outboundTokenBalance}
                outboundUnwrappedBalance={outboundBalance.data?.formatted}
                swapTheme={swapTheme}
                showMaxAnimation={showMaxAnimation}
                setShowMaxAnimation={setShowMaxAnimation}
                setUseMax={setUseMax}
                setShowModal={setShowModal}
                setOutbound={setOutbound}
                setSwapAmount={setSwapAmount}
                setValueLength={setValueLength}
            />
            <ActivateSwapArrow
                swapTheme={swapTheme}
                overBalance={overBalance}
                isEntered={isEntered}
                setSwapActive={setSwapActive}
            />
            <div className="flex flex-col ease-in-out duration-300 transition-all"
                style={{
                    backgroundColor: swapTheme.streamLengthBox,
                    borderRadius: swapTheme.secondaryBorderRadius
                }}
            >
                <InboundBox
                    swapTheme={swapTheme}
                    inboundUnwrappedBalance={inboundBalance.data?.formatted}
                    inboundWrappedBalance={inboundTokenBalance}
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
                isPayOnce={isPayOnce}
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