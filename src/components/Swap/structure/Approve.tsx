import { Theme } from "../../../theme";
import { defaultTheme } from "../../../theme/theme";
import React, { useState } from "react";
import ApproveRow from "./ApproveRow";
import { BsCheckLg } from "react-icons/bs";
//import { SwapText } from "../../../theme/animation";
import { useStore } from "../../../store";
import { useEthersProvider } from "../../../providers/provider";
import { useEthersSigner } from "../../../providers/signer";
import getPoolAddress from "../helpers/getPool";
import { Framework, WrapperSuperToken } from "@superfluid-finance/sdk-core";
import { mumbaiChainId } from "../../../utils/constants";
import { CollapseState } from "../../../types/CollapseState";
import { FiChevronLeft } from "react-icons/fi";
import { parseEther } from 'viem'
import toLocale from "../../../utils/toLocale";

interface BufferMessageProps {
    swapTheme: Theme;
    isBufferAccepted: boolean;
    setIsBufferAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}

const BufferMessage = ({swapTheme, isBufferAccepted, setIsBufferAccepted}: BufferMessageProps) => {

    const store = useStore();

    return (
        <div 
            className="flex flex-col rounded-3xl bg-red-500/50 p-6 text-sm space-y-4 items-center justify-center"
            style={{
                //borderRadius: swapTheme.primaryBorderRadius
                backgroundColor: swapTheme.streamLengthBox,
                color: swapTheme.accentText,
            }}
        >
            {
                /*
                    automated stream cancellation not added yet - once we are sure that deposits won't be lost, display this for 'Total Amount'

                    store.flowrateUnit.sublabel == 'once' ?
                        <p className="text-xs leading-5">
                            {`${toLocale(store.getExpectedDeposit())} ${store.outboundToken?.symbol} will be locked by Superfluid as a deposit, which you will get back at the end of your swap. If you unwrap your tokens early, you may lose this deposit.`}
                        </p>
                        :
                */
                <p className="text-xs leading-5">
                    {`If you do not cancel your swap before your balance reaches zero, you will lose your ${store.getExpectedDeposit().toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${store.outboundToken?.symbol} deposit.`}
                </p>
            }
            <div className="flex items-end justify-between w-full">
                <p
                    className="opacity-80"
                    style={{
                        color: swapTheme.primaryText,
                        fontWeight: swapTheme.accentFontWeight
                    }}
                >
                    Yes, I understand.
                </p>
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
            </div>
        </div>
    );
}

interface ApproveSwapProps {
    theme: Theme;
}

const Approve = ({
    theme
}: ApproveSwapProps) => {
    const [isBufferAccepted, setIsBufferAccepted] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false)
    const provider = useEthersProvider()
    const signer = useEthersSigner()
    const store = useStore()
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const options = [
        { title: "Spending", data: store.getSwapAmountAsLocaleString() + " " + store.outboundToken?.symbol + (store.flowrateUnit.sublabel != 'once' ? (" /" + store.flowrateUnit.sublabel) : '') },
        { title: "Receiving", data: store.inboundToken?.symbol },
        { title: "Flowrate", data: parseFloat(store.getEffectiveFlowRate()).toFixed(8) + " /s" },
        { title: "Wrapping", data: toLocale(store.getAmountNeededToWrap()) + ' ' + store.outboundToken?.underlyingToken.symbol },
        /*{ title: "Start Date", data: startDate },
        { title: "Start Time", data: startTime },
        { title: "End Date", data: endDate },
        { title: "End Time", data: endTime },
        { title: "Auto Wrap", data: autoWrap ? "On" : "Off" },*/
    ]

    const filteredOptions = options.filter(
        (option) =>
            !(
                (option.title === "End Date" &&
                    option.data === "Not scheduled") ||
                (option.title === "End Time" && option.data === "")
            )
    );

    const swap = async () => {
        const pool = getPoolAddress(
            store.inboundToken?.address,
            store.outboundToken?.address
        );

        const token = store.outboundToken.address;

        try {
            const superfluid = await Framework.create({
                chainId: mumbaiChainId,
                provider: provider,
            });
            const sender = await signer.getAddress();
            const swapFlowRate = store.getEffectiveFlowRateEther();//parseEther(`${parseFloat(store.getEffectiveFlowRate())}`).toString()
            const currentFlowRate = parseFloat((
                await superfluid.cfaV1.getFlow({
                    superToken: token,
                    sender: sender,
                    receiver: pool,
                    providerOrSigner: signer,
                })
            ).flowRate);

            const amountNeededToWrap = parseEther(`${store.getAmountNeededToWrap()}`).toString()
            const superToken = (await superfluid.loadSuperToken(token)) as WrapperSuperToken;
            const upgradeOperation = superToken.upgrade({ amount: amountNeededToWrap });
            const flowOperation = currentFlowRate > 0 ? 
                superfluid.cfaV1.updateFlow({
                    receiver: pool,
                    flowRate: swapFlowRate,
                    superToken: token,
                    sender,
                }) :
                superfluid.cfaV1.createFlow({
                    receiver: pool,
                    flowRate: swapFlowRate,
                    superToken: token,
                    sender,
                });

            // magical batch call
            const superfluidCall = store.getAmountNeededToWrap() > 0 ? superfluid.batchCall([upgradeOperation, flowOperation]) : flowOperation;
            const result = await superfluidCall.exec(signer);
            const transactionReceipt = await result.wait();
            console.log(transactionReceipt.transactionHash)
            store.setLastSwapTx(transactionReceipt.transactionHash)

            store.setCollapseState(CollapseState.SWAP_SUCCESS);
        } catch (error) {
            store.setCollapseState(CollapseState.SWAP_FAILURE);
            console.log(error)
        }
    };

    const handleApproveClick = () => {
        if (isBufferAccepted) {
            store.setCollapseState(CollapseState.SWAP_SUBMITTING);
            setIsBufferAccepted(false);
            swap()
        } else {
            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 600);
        }
    };

    return (
        <div className={`flex flex-col w-full items-start justify-start 2px-2 2md:px-6 2py-5 space-y-8 `}
            style={{
                transitionDuration: swapTheme.primaryDuration,
            }}
        >
            <div className="px-2 md:px-6 pt-5 space-y-8 w-full">
                <div className="w-full flex flex-col 2flex-row 2items-center justify-between text-2xl"
                    style={{
                        color: swapTheme.TitleColor,
                        fontWeight: swapTheme.accentFontWeight
                    }}
                >
                    <button 
                        className="flex items-center justify-center space-x-1 text-xs w-min pr-4 pl-3 py-2 rounded-full -ml-2 mb-2 hover:scale-105 duration-300 transition-all"
                        onClick={() => {
                            store.setCollapseState(CollapseState.NONE)
                            setIsBufferAccepted(false);
                        }}
                        style={{
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.accentText,

                        }}
                    >
                        <FiChevronLeft />
                        <p>back</p>
                    </button>
                    <h1>Confirm Swap</h1>
                </div>
                <div className="space-y-4">
                    <div className="w-full flex flex-col space-y-3 px-8 py-6 rounded-3xl text-sm"
                        style={{
                            //borderRadius: swapTheme.primaryBorderRadius
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.accentText,
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
                    <BufferMessage
                        swapTheme={swapTheme}
                        isBufferAccepted={isBufferAccepted}
                        setIsBufferAccepted={setIsBufferAccepted}
                    />
                </div>
            </div>
            <button className={`${isBufferAccepted ? '' : 'opacity-60'} w-full `}
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
                {/*<SwapText swapTheme={swapTheme} showAnimation={showAnimation}>Confirm Swap</SwapText>*/}
                Confirm Swap
            </button>
        </div>
    );
};

export default Approve;
