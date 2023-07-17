import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React, { useEffect, useRef, useState } from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { IoMdClose } from 'react-icons/io'
import { TokenTypes } from "../../../types/TokenOption";
import ApproveRow from "./ApproveRow";
import { BsCheckLg } from 'react-icons/bs'
import { SwapText } from "../../../theme/animation";
import { useStore } from "../../../store";
import { useEthersProvider } from "../../../providers/provider";
import { useEthersSigner } from "../../../providers/signer";
import { BigNumber, ethers } from "ethers";
import getPoolAddress from "../helpers/getPool";
import { Framework } from "@superfluid-finance/sdk-core";
import { mumbaiChainId } from "../../../utils/constants";
import { useAccount, useNetwork } from "wagmi";
import flowrates from "../../../utils/flowrates";

interface ApproveSwapProps {
    flowrateUnit: GenericDropdownOption;
    flowrate: number;
    theme: Theme;
    outboundToken: TokenTypes | undefined;
    inboundToken: TokenTypes | undefined;
    swapAmount: number;
    setIsEntered: (value: boolean) => void;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    autoWrap: boolean;
    swapActive: boolean;
    setSwapActive: (value: boolean) => void;
    isBufferAccepted: boolean;
    setIsBufferAccepted: (value: boolean) => void;
    isApproved: boolean;
    setIsApproved: (value: boolean) => void;
    buffer: number;
    swapFlowRate: string;
    setIsSwapFinished: (value: boolean) => void;
    setIsSwapSuccess: (value: boolean) => void;
    setTx: (value: string) => void;
    outBalance: number;
    setFlow: (value: GenericDropdownOption) => void;
}

const Approve = ({
    flowrateUnit,
    flowrate,
    theme,
    outboundToken,
    inboundToken,
    swapAmount,
    setIsEntered,
    startDate,
    startTime,
    endDate,
    endTime,
    autoWrap,
    swapActive,
    setSwapActive,
    isBufferAccepted,
    setIsBufferAccepted,
    isApproved,
    setIsApproved,
    buffer,
    swapFlowRate,
    setIsSwapFinished,
    setIsSwapSuccess,
    setTx,
    outBalance,
    setFlow
}: ApproveSwapProps) => {
    const [isExitHover, setIsExitHover] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false)
    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const { address } = useAccount()
    const { chain } = useNetwork();

    const userToken0Flow = useRef(BigNumber.from(0));
    const userToken1Flow = useRef(BigNumber.from(0));
    const token0Flow = useRef(BigNumber.from(0));
    const token1Flow = useRef(BigNumber.from(0));

    const [token0Price, setToken0Price] = useState(0);
    const [priceMultiple, setPriceMultiple] = useState<BigNumber>(
        BigNumber.from(0)
    );

    const [displayedExpectedFlowRate, setDisplayedExpectedFlowRate] =
        useState<string>("");

    const [, setRefreshingPrice] = useState(false);
    const [priceTimeout, setPriceTimeout] = useState<
        NodeJS.Timeout | undefined
    >(undefined);
    const [, setPriceImpact] = useState<number>(0);
    const [minBalance, setMinBalance] = useState(BigNumber.from(0));
    const [deposit, setDeposit] = useState(BigNumber.from(0));
    const [, setAcceptedBuffer] = useState(false);
    const [, setPoolExists] = useState(false);

    const store = useStore()

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const options = [
        { title: "Spending", data: swapAmount?.toFixed(5) + " " + outboundToken?.symbol },
        { title: "Receiving", data: inboundToken?.symbol },
        { title: "Flowrate", data: (flowrate * flowrateUnit.value).toFixed(8) + " / " + flowrateUnit.sublabel },
        { title: "Start Date", data: startDate },
        { title: "Start Time", data: startTime },
        { title: "End Date", data: endDate },
        { title: "End Time", data: endTime },
        { title: "Auto Wrap", data: autoWrap ? "On" : "Off" },
    ]

    const filteredOptions = options.filter(
        (option) =>
            !(
                (option.title === "End Date" && option.data === "Not scheduled") ||
                (option.title === "End Time" && option.data === "")
            )
    );

    //console.log('DIFF FLOWRATES: ', flowrate, swapFlowRate)

    const swap = async () => {
        setIsSwapFinished(false)
        setFlow(store.flowrateUnit)

        if (signer === null || signer === undefined) {
            setIsSwapFinished(true)
            setIsSwapSuccess(false)
            return;
        }

        const pool = getPoolAddress(
            store.inboundToken?.address,
            store.outboundToken?.address
        );

        console.log(pool)
        const token = store.outboundToken.address;

        let transactionHash;
        try {
            const superfluid = await Framework.create({
                chainId: mumbaiChainId,
                provider: provider,
            });


            const sender = await signer.getAddress();
            if (token) {
                if (userToken0Flow.current.gt(0)) {
                    // update stream
                    const updateFlowOperation = superfluid.cfaV1.updateFlow({
                        receiver: pool,
                        flowRate: swapFlowRate,
                        superToken: token,
                        sender,
                    });
                    const result = await updateFlowOperation.exec(signer);
                    transactionHash = result.hash;
                    const transactionReceipt = await result.wait();
                    // Add set Transactionsuccess ( might want to take the same approach as toast )

                    setTx(transactionReceipt.transactionHash)
                    console.log(transactionReceipt.transactionHash)
                } else {
                    const createFlowOperation = superfluid.cfaV1.createFlow({
                        receiver: pool,
                        flowRate: swapFlowRate,
                        superToken: token,
                        sender,
                    });

                    const result = await createFlowOperation.exec(signer);
                    transactionHash = result.hash;
                    const transactionReceipt = await result.wait();

                    setTx(transactionReceipt.transactionHash)
                }

                setIsSwapFinished(true)
                setIsSwapSuccess(true)
                store.setFlowrateUnit(flowrates[1])
            }
        } catch (error) {
            setIsSwapFinished(true)
            setIsSwapSuccess(false)
            store.setFlowrateUnit(flowrates[1])
            console.log(error)
        }
    };

    const refreshPrice = async () => {
        setRefreshingPrice(true);
        // clear any existing timeouts
        if (priceTimeout) {
            clearTimeout(priceTimeout);
            setPriceTimeout(undefined);
        }

        if (!store.outboundToken || swapFlowRate === "") {
            return;
        }

        // set a timeout
        const timeout: NodeJS.Timeout = setTimeout(async () => {
            // calculate new flows
            let calculatedToken0Flow = BigNumber.from(token0Flow.current);
            calculatedToken0Flow = token0Flow.current
                .add(swapFlowRate)
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
            const oneHourStream = BigNumber.from(swapFlowRate).mul(
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

        // TODO: Assess missing dependency array values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swapFlowRate]);

    // update vars when tokens change
    useEffect(() => {
        const updateFlowVars = async () => {
            const token0Address = store.outboundToken?.address;
            const token1Address = store.inboundToken?.address;

            try {
                const poolAddress = getPoolAddress(
                    store.inboundToken?.address,
                    store.outboundToken?.address
                );
                setPoolExists(true);

                // init sf framework
                const sf = await Framework.create({
                    chainId: mumbaiChainId,
                    provider,
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
        };

        updateFlowVars();
        // TODO: Assess missing dependency array values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.inboundToken, store.outboundToken, address, chain, swapFlowRate]);

    useEffect(() => {
        // calculate expected outgoing flowrate
        if (swapFlowRate !== "") {
            setDisplayedExpectedFlowRate(
                ethers.utils.formatEther(
                    BigNumber.from(swapFlowRate)
                        .mul(priceMultiple)
                        .mul(store.flowrateUnit.value)
                        .div(BigNumber.from(2).pow(128))
                )
            );
        } else {
            setDisplayedExpectedFlowRate("");
        }
        // TODO: Assess missing dependency array values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceMultiple]);

    const formattedOutBalance = isNaN(outBalance) ? ethers.BigNumber.from(0) : ethers.utils.parseUnits(outBalance.toString());

    const enoughBuffer = minBalance.lt(formattedOutBalance);

    const handleApproveClick = () => {
        if (isBufferAccepted) {
            setIsApproved(true)
            swap()
        } else {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 600);
        }
    };

    return (
        <div className={`${swapActive ? ' flex' : 'hidden'} flex-col w-full h-full items-start justify-start ease-in-out rounded-[3rem] px-2 md:px-3`}
            style={{
                transitionDuration: swapTheme.primaryDuration
            }}
        >
            <div className="w-full flex flex-row items-center justify-between pl-3 pr-2 text-2xl"
                style={{
                    color: swapTheme.TitleColor,
                    fontWeight: swapTheme.accentFontWeight
                }}
            >
                <h1>Approve Swap</h1>
                <IoMdClose className="text-3xl cursor-pointer ease-in-out"
                    onMouseEnter={() => {
                        setIsExitHover(true)
                    }}
                    onMouseLeave={() => {
                        setIsExitHover(false)
                    }}
                    style={{
                        color: isExitHover ? swapTheme.accentText : swapTheme.primaryText,
                        transitionDuration: swapTheme.secondaryDuration
                    }}
                    onClick={() => {
                        setSwapActive(false)
                        setIsBufferAccepted(false)
                    }}
                />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-between space-y-0 px-2 pt-4 pb-5"
                style={{
                    borderRadius: swapTheme.accentBorderRadius
                }}
            >
                <div className="w-full flex flex-col space-y-9 px-1 pt-6 pb-0 ease-in-out duration-200 mt-8"
                    style={{
                        backgroundColor: "transparent",
                        borderRadius: swapTheme.accentBorderRadius
                    }}
                >
                    <div className="w-full flex flex-col space-y-3 px-3 py-0"
                        style={{
                            borderRadius: swapTheme.accentBorderRadius
                        }}
                    >
                        {filteredOptions.map((option, index) => (
                            <ApproveRow
                                item={option}
                                index={index}
                                swapTheme={swapTheme}
                                key={index}
                            />
                        ))}
                    </div>
                    <div className="w-full flex flex-col justify-start items-start py-5 px-5 space-y-4 leading-relaxed text-sm"
                        style={{
                            backgroundColor: enoughBuffer ? isBufferAccepted ? swapTheme.swapButton : swapTheme.useMaxButton : swapTheme.errorColor,
                            borderRadius: "25px"
                        }}
                    >
                        {deposit.gt(formattedOutBalance) ? (
                            <p
                                className="opacity-90"
                                style={{
                                    color: swapTheme.primaryText,
                                }}
                            >
                                {`You do not have enough balance to cover the ${ethers.utils.formatEther(
                                    deposit
                                )} ${store.outboundToken?.symbol} buffer.`}
                            </p>
                        ) : (
                            <p
                                className="opacity-90"
                                style={{
                                    color: swapTheme.primaryText,
                                }}
                            >If you do not cancel your swap before your balance reaches zero, you will lose your {parseFloat(ethers.utils.formatEther(deposit)).toFixed(5)} {store.outboundToken?.underlyingToken?.symbol} buffer.</p>
                        )}
                        <div className={`${enoughBuffer ? 'flex' : 'hidden'} flex-row space-x-2 items-center font-bold`}>
                            <button
                                className="w-[25px] h-[25px] border-[1px] focus:outline-none ease-in-out"
                                style={{
                                    backgroundColor: isBufferAccepted ? "white" : "transparent",
                                    borderColor: "white",
                                    borderRadius: swapTheme.checkBorderRadius,
                                    transitionDuration: swapTheme.primaryDuration
                                }}
                                onClick={() => {
                                    setIsBufferAccepted(!isBufferAccepted)
                                }}
                            >
                                {isBufferAccepted && <BsCheckLg style={{ color: swapTheme.swapButton }} className="w-full h-full" />}
                            </button>
                            <p
                                className="opacity-80"
                                style={{
                                    color: swapTheme.primaryText,
                                    fontWeight: swapTheme.accentFontWeight
                                }}
                            >Yes, I understand the risk.</p>
                        </div>
                    </div>
                </div>
                <button className={`${isBufferAccepted ? '' : 'opacity-60'} w-full mt-4 ease-in-out`}
                    onClick={handleApproveClick}
                    style={{
                        backgroundColor: swapTheme.swapButton,
                        color: swapTheme.swapButtonText,
                        fontSize: swapTheme.swapButtonFontSize,
                        padding: swapTheme.swapButtonPadding,
                        fontWeight: swapTheme.secondaryFontWeight,
                        borderRadius: swapTheme.itemBorderRadius,
                        transitionDuration: swapTheme.primaryDuration
                    }}>
                    <SwapText swapTheme={swapTheme} showAnimation={showAnimation}>Approve</SwapText>
                </button>
            </div>
        </div>
    )
}

export default Approve;