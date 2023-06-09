import React, { useEffect, useRef, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useBalance, useNetwork, usePublicClient } from "wagmi";
import { TbSettings } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import Image from "next/image";
import { HiArrowDown } from 'react-icons/hi'
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
import flowrates from "../../utils/flowrates";
import CenteredSelect from "./structure/CenteredSelect";
import 'tailwindcss/tailwind.css'
import ConnectWalletButton from "../ConnectWallet/ConnectWalletButton";
import StreamLength from "./structure/StreamLength";
import PriceImpact from "./structure/PriceImpact";
import TokenDisplay from "./structure/TokenDisplay";
import Settings from "./structure/Settings";
import FlowRateSelect from "./structure/FlowRateSelect";
import '../../styles/SwapWidget.module.css'
import { CSSTransition } from 'react-transition-group';
import FlowRateRow from "./structure/FlowRateRow";

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

    const [showModal, setShowModal] = useState(false);
    const [fontSize, setFontSize] = useState(72);
    const [previousLength, setPreviousLength] = useState(0);
    const [valueLength, setValueLength] = useState(0)
    const [swapAmount, setSwapAmount] = useState<number>();
    const [width, setWidth] = useState(20)
    const [overBalance, setOverBalance] = useState(false)
    const [outboundAddress, setOutboundAddress] = useState<`0x${string}` | undefined>();
    const [inboundAddress, setInboundAddress] = useState<`0x${string}` | undefined>();
    const inputRef = useRef(null);

    const outboundBalance = useBalance({
        address: address,
        token: outboundAddress,
    })

    const inboundBalance = useBalance({
        address: address,
        token: inboundAddress,
    })

    const activateInput = () => {
        inputRef.current.focus();
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setPreviousLength(valueLength);
        setValueLength(value.length);
        setSwapAmount(value)
    };

    const changeSize = () => {
        if (previousLength > valueLength) {
            setFontSize(fontSize * 1.1)
        } else {
            setFontSize(fontSize * .9)
        }
    }

    const [outgoingFlowRate, setOutgoingFlowRate] = useState(0)

    useEffect(() => {
        if (previousLength < valueLength && width < 105 && width >= 0) {
            setWidth(width + 15);
        } else if (previousLength > valueLength && width > 20 && valueLength <= 5) {
            setWidth(width - 15);
        }


        if (valueLength >= 7) {
            changeSize()
        } else {
            setFontSize(72)
        }

        if (swapAmount > parseFloat(outboundBalance.data?.formatted) && store.outboundToken || outboundBalance.data?.formatted === 'undefined') {
            setOverBalance(true)
        } else {
            setOverBalance(false)
        }

    }, [valueLength, previousLength, swapAmount])

    useEffect(() => {
        if (isConnected && !isDisconnected) {
            setWallet(true)
        } else {
            setWallet(false)
        }
    }, [isConnected, isDisconnected])

    const [length, setLength] = useState(24);

    useEffect(() => {
        if (store.inboundToken === store.outboundToken && outbound) {
            store.setInboundToken(null)
        } else if (store.inboundToken === store.outboundToken && !outbound) {
            store.setOutboundToken(null)
        }

        if (store.inboundToken) { setInboundAddress(store.inboundToken.address) }
        if (store.outboundToken) { setOutboundAddress(store.outboundToken.address) }

        const lengthInSeconds = length * 3600;

        const expectedOutFlow = swapAmount / lengthInSeconds;

        if (swapAmount !== 0 && swapAmount !== undefined) {
            setOutgoingFlowRate(expectedOutFlow);
        } else {
            setOutgoingFlowRate(0)
        }



    }, [store.inboundToken, store.outboundToken, swapAmount, length])

    useEffect(() => {
        console.log(Date().toLocaleString())
    }, [])



    const [isWallet, setWallet] = useState(false)
    const [isPayOnce, setIsPayOnce] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const [outbound, setOutbound] = useState(false)
    const [hoverCount, setHoverCount] = useState(0)


    const handleSettingsHover = () => {
        setHoverCount(prevCount => prevCount + 1)
    }

    const [autoWrap, setAutoWrap] = useState(false);
    const [displaySuperTokens, setDisplaySuperTokens] = useState(false)
    const [importTokens, setImportTokens] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [flowRateDropDown, setFlowRateDropDown] = useState(false)

    return (
        <div className="relative flex flex-col px-6 pb-6 pt-12 2border-[3px] 2rounded-[3.25rem] 2border-red-500 z-10 max-w-[27rem] min-w-[25rem]">
            <div className="absolute overflow-hidden 2bg-red-500/25 top-10 left-[0.5rem] right-[0.5rem] bottom-[0.5rem] rounded-gc-3xl z-50 pointer-events-none">
                <div
                    className={`absolute bottom-0 left-0 right-0 z-50 bg-black transition-all rounded-[2rem] duration-300 ${showModal
                        ? "top-0 pointer-events-auto"
                        : "top-full pointer-events-none"
                        }`}
                >
                    <TokenDisplay
                        tokenOption={tokenList}
                        display={showModal}
                        setDisplay={setShowModal}
                        setOutboundToken={store.setOutboundToken}
                        setInboundToken={store.setInboundToken}
                        outbound={outbound}
                    />
                </div>
                <div
                    className={`absolute bottom-0 left-0 right-0 z-50 bg-black transition-all rounded-[2rem] duration-300 ${showSettings
                        ? "top-0 pointer-events-auto"
                        : "top-full pointer-events-none"
                        }`}
                >
                    <Settings
                        display={showSettings}
                        setDisplay={setShowSettings}
                        theme={theme}
                        autoWrap={autoWrap}
                        setAutoWrap={setAutoWrap}
                        displaySuperTokens={displaySuperTokens}
                        setDisplaySuperTokens={setDisplaySuperTokens}
                        importTokens={importTokens}
                        setImportTokens={setImportTokens}
                        schedule={schedule}
                        setSchedule={setSchedule}
                    />
                </div>
            </div>
            {/* Change these next two divs, not sure why border and background are defined this way 🤔 */}
            <div className="absolute top-[0.2rem] bottom-[0.2rem] left-[0.2rem] right-[0.2rem] -z-10 pointer-events-none" style={{
                backgroundColor: swapTheme.bgColor,
                borderColor: swapTheme.borderColor,
                borderWidth: swapTheme.borderWidth,
                borderRadius: swapTheme.borderRadius
            }}
            />
            <div className="flex">
                <p style={{
                    color: swapTheme.TitleColor
                }} className={`text-2xl font-bold ml-2`}>Swap</p>
                <div className="flex grow" />
                <button
                    className={`hover:animate-spin-slow`}
                    onMouseEnter={handleSettingsHover}
                    style={{ color: swapTheme.icons }}
                    type="button"
                >
                    <TbSettings size={25} onClick={() => {
                        setShowSettings(true);
                    }} />
                </button>
            </div>
            <div className="relative w-full flex items-center justify-center h-32 overflow-hidden mt-8">
                <div
                    className={` font-bold w-5/6 flex flex-row items-center justify-center monospace-font transition-all duration-300 cursor-text`}
                    style={{ color: swapTheme.primaryText }}
                    onClick={activateInput}
                >
                    <div className="w-[30px] h-[30px] mb-12 -ml-6 cursor-pointer z-10">
                        {store.outboundToken ? (
                            <Image
                                src={store.outboundToken.logoURI}
                                width="40"
                                height="40"
                                alt="OutboundToken"
                                onClick={() => {
                                    setOutbound(true)
                                    setShowModal(true)
                                }}
                            />
                        ) : (
                            <div className="rounded-full border-2"
                                style={{
                                    backgroundColor: swapTheme.plusBg,
                                    borderColor: swapTheme.plusBorder,
                                    color: swapTheme.plusColor
                                }}
                            >
                                <BsPlus className="w-full h-full" onClick={() => {
                                    setOutbound(true)
                                    setShowModal(true)
                                }} />
                            </div>
                        )}
                    </div>
                    <input className={`${valueLength > 0 ? "text-center" : "text-start"} border-transparent p-2 border-b border-solid focus:border-none focus:outline-none min-w-[15%]`}
                        style={{
                            fontSize,
                            width: `${width}%`,
                            backgroundColor: swapTheme.bgColor,
                        }}
                        type="text"
                        ref={inputRef}
                        onChange={handleInputChange}
                        placeholder="0"
                        value={swapAmount}
                    />
                </div>
            </div>
            <div className="mt-6">
                <FlowRateSelect
                    dropdownValue={store.flowrateUnit}
                    theme={theme}
                    setIsPayOnce={setIsPayOnce}
                    setFlowRateDropDown={setFlowRateDropDown}
                    flowRateDropDown={flowRateDropDown}
                />
                <div className={`${isPayOnce ? 'h-[49.5%]' : 'h-[42%]'} ${flowRateDropDown ? '' : 'hidden'} absolute bottom-5 w-[89%] rounded-lg z-[100]`}>
                    <CSSTransition
                        in={flowRateDropDown}
                        appear={true}
                        timeout={300}
                        classNames={{
                            enter: 'opacity-0',
                            enterActive: 'opacity-100 transition-opacity duration-300 ease-in-out',
                            exit: 'opacity-100',
                            exitActive: 'opacity-0 transition-opacity duration-300 ease-in-out',
                        }}
                        unmountOnExit
                    >
                        <FlowRateRow
                            theme={theme}
                            setDropdownValue={store.setFlowrateUnit}
                            options={flowrates}
                            setFlowRateDropDown={setFlowRateDropDown}
                        />
                    </CSSTransition>
                </div>
            </div>
            <button
                type="button"
                className="flex p-3 rounded-lg mt-2 items-center hover:scale-[1.02] duration-200 transition-all"
                style={{
                    backgroundColor: swapTheme.tokenBox
                }}
                onClick={() => {
                    setShowModal(true);
                    setOutbound(true)
                }}
            >
                <div className="w-[40px] h-[40px]">
                    {store.outboundToken ? (
                        <Image
                            src={store.outboundToken.logoURI}
                            width="40"
                            height="40"
                            alt="Token"
                        />
                    ) : (
                        <div className="rounded-full border-2"
                            style={{
                                backgroundColor: swapTheme.plusBg,
                                borderColor: swapTheme.plusBorder,
                                color: swapTheme.plusColor
                            }}
                        >
                            <BsPlus className="w-full h-full" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col grow pl-3 space-y-1 items-start justify-center">
                    <p className="font-medium leading-none text-sm"
                        style={{
                            color: swapTheme.secondaryText
                        }}
                    >
                        {store.outboundToken
                            ? store.outboundToken.name
                            : "You pay with:"}
                    </p>
                    <p className="font-medium leading-none text-xs monospace-font"
                        style={{
                            color: swapTheme.tokenBalance
                        }}
                    >
                        {parseFloat(
                            outboundBalance.data?.formatted
                        ) === 0 || !store.outboundToken || outboundBalance.data?.formatted === undefined
                            ? "0.0"
                            : parseFloat(
                                outboundBalance.data?.formatted
                            ).toFixed(5)}
                    </p>
                </div>
                <div
                    className="text-xs font-medium h-8 px-4 rounded-full hover:scale-110 hover:-translate-x-1 duration-200 transition-all flex items-center justify-center"
                    style={{
                        backgroundColor: swapTheme.useMaxButton,
                        color: swapTheme.useMaxText
                    }}
                    onClick={() => {
                        // console.log("this does not work with dynamic input box! Need to fix!")
                    }}
                >
                    Use Max
                </div>
            </button>
            <div className="flex w-full items-center justify-center -mt-4">
                <div className="px-2 py-2 z-10 rounded-2xl opacity-80 hover:opacity-100 cursor-pointer"
                    style={{
                        backgroundColor: swapTheme.useMaxButton,
                    }}
                >
                    <HiArrowDown className="text-2xl"
                        style={{
                            color: swapTheme.tokenBalance
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col rounded-lg ease-in-out duration-300 transition-all"
                style={{
                    backgroundColor: swapTheme.streamLengthBox
                }}
            >
                <button
                    type="button"
                    className="flex p-3 rounded-lg -mt-4 items-center hover:scale-[1.02] duration-200 transition-all"
                    style={{
                        backgroundColor: swapTheme.tokenBox
                    }}
                    onClick={() => {
                        setShowModal(true)
                        setOutbound(false)
                    }}
                >
                    <div className="w-[40px] h-[40px]">
                        {store.inboundToken ? (
                            <Image
                                src={store.inboundToken.logoURI}
                                width="40"
                                height="40"
                                alt="token"
                            />
                        ) : (
                            <div className="rounded-full border-2"
                                style={{
                                    backgroundColor: swapTheme.plusBg,
                                    borderColor: swapTheme.plusBorder,
                                    color: swapTheme.plusColor
                                }}
                            >
                                <BsPlus className="w-full h-full" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col grow pl-3 space-y-1 items-start justify-center">
                        <p className="font-medium leading-none text-sm"
                            style={{
                                color: swapTheme.secondaryText
                            }}
                        >
                            {store.inboundToken
                                ? store.inboundToken.name
                                : "You receive:"}
                        </p>
                        <p className="font-medium leading-none text-xs monospace-font"
                            style={{
                                color: swapTheme.tokenBalance
                            }}
                        >
                            {parseFloat(
                                inboundBalance.data?.formatted
                            ) === 0 || !store.inboundToken || inboundBalance.data?.formatted === undefined
                                ? "0.0"
                                : parseFloat(
                                    inboundBalance.data?.formatted
                                ).toFixed(5)}
                        </p>
                    </div>
                </button>
                <div className={`rounded-lg px-2 pb-2 w-full 
                ${store.inboundToken &&
                        store.outboundToken &&
                        swapAmount > 0 &&
                        parseInt(outboundBalance.data?.formatted) > 0 ? "" : 'hidden'}`}
                    style={{
                        backgroundColor: swapTheme.streamLengthBox
                    }}
                >
                    <div className="w-full rounded-lg flex flex-col px-6 py-3 items-start text-xs space-y-2 bg-[#0D0D0D]"
                        style={{
                            color: swapTheme.tokenBalance,
                        }}
                    >
                        <p>Start Date: </p>
                        <p>End Date: </p>
                        <p>{store.outboundToken?.symbol} Flowrate: -{outgoingFlowRate.toFixed(8)} / sec</p>
                    </div>
                </div>
            </div>
            <div className={`${isPayOnce ? 'mt-3' : 'mt-0'} w-full rounded-lg bg-transparent`}>
                {isPayOnce ? (
                    <div className="flex flex-row justify-between">
                        <StreamLength
                            theme={theme}
                            setLength={setLength}
                            length={length}
                        />
                    </div>
                ) : (
                    <div />
                )}
            </div>
            {isWallet ? (
                <button className={`${overBalance ? 'opacity-80 cursor-default' : ''} font-semibold 2rounded-gc-2xl rounded-full mt-4`} style={{
                    backgroundColor: swapTheme.swapButton,
                    color: swapTheme.swapButtonText,
                    fontSize: swapTheme.swapButtonFontSize,
                    padding: swapTheme.swapButtonPadding
                }}>
                    {overBalance ? `Insufficient ${store.outboundToken?.symbol} balance` : 'Swap'}
                </button>
            ) : (
                <ConnectWalletButton theme={theme} />
            )}
        </div>
    );
};

export default SwapWidget;