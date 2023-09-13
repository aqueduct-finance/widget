import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useStore } from "../../store";
import { defaultTheme } from '../../theme/theme'
import { Theme } from "../../theme";
import { TokenTypes } from "../../types/TokenOption";
import { TestTokens } from "../../utils/erc20s";
import ConnectWalletButton from "../ConnectWallet/ConnectWalletButton";
import FlowRateSelect from "./structure/FlowRateSelect";
import '../../styles/SwapWidget.module.css'
import WidgetTitle from "./structure/WidgetTitle";
import OutboundBox from "./structure/OutboundBox";
import ActivateSwapArrow from "./structure/ActivateSwapArrow";
import InboundBox from "./structure/InboundBox";
import SwapButton from "./structure/SwapButton";
import DynamicInputBox from "./structure/DynamicInputBox";
import CollapsableModalWrapper from "./structure/CollapsableModalWrapper";
import { CollapseState } from "../../types/CollapseState";
import CollapsableWrapper from "./structure/CollapsableWrapper";
import TokenDisplay from "./structure/TokenDisplay";
import flowrates from "../../utils/flowrates";
import FlowRateRow from "./structure/FlowRateRow";
import Approve from "./structure/Approve";
import ReverseCollapsableWrapper from "./structure/ReverseCollapsableWrapper";
import WrapTokens from "./structure/WrapTokens";
import TransactionSuccess from "./structure/TransactionSuccess";
import TransactionFailed from "./structure/TransactionFailed";
import SubmittingSwap from "./SubmittingSwap";
import DateTimeSelectButton from "./structure/DateTimeSelectButton";
import DateTimeSelect from "./structure/DateTimeSelect";
import { DatePickerStateProvider } from "@rehookify/datepicker";

interface SwapWidgetProps {
    theme?: Theme;
    tokenOption?: TokenTypes[];
    defaultTokens?: boolean;
    width: string;
}

const SwapWidget = ({ theme, tokenOption, defaultTokens = true, width = "27rem" }: SwapWidgetProps) => {

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const tokenList: TokenTypes[] = defaultTokens
        ? tokenOption
            ? [...TestTokens, ...tokenOption]
            : [...TestTokens]
        : tokenOption
        ? [...tokenOption]
        : [];

    const store = useStore();
    const { address, isConnected } = useAccount();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (address) {
            setIsLoading(false);
        }
    }, [address])

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const onDatesChange = (d: Date[]) => {
        setSelectedDates(d);

        if (d && d.length > 0) {
            const now = new Date();
            const diff = (d[0].getTime() - now.getTime()) / 1000; // in milliseconds, convert to seconds
            store.setPayOnceLength(diff);
        }
    }

    return (
        <DatePickerStateProvider 
            config={{
                selectedDates,
                onDatesChange,
                time: {
                    interval: 1
                },
                dates: {
                mode: 'single',
                minDate: new Date()
                },
                locale: {
                options: {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                },
                },
            }}
        >
            <div className={`relative flex flex-col p-3 md:p-5 z-10 overflow-hidden bg-transparent md:bg-current border-none md:border-solid w=[${width}]`}
                style={{
                    fontFamily: swapTheme.textFont,
                    color: swapTheme.bgColor,
                    borderColor: swapTheme.borderColor,
                    borderWidth: swapTheme.primaryBorderWidth,
                    borderRadius: swapTheme.primaryBorderRadius
                }}
            >
                <CollapsableWrapper>
                    <WidgetTitle
                        swapTheme={swapTheme}
                    />
                    <div className="h-[104px] flex items-center justify-center monospace-font font-bold mt-8" >
                        <DynamicInputBox
                            swapTheme={swapTheme}
                            paddingPercentage={0.15}
                            setDynamicInput={store.setSwapAmount}
                            dynamicInput={store.swapAmount}
                        />
                    </div>
                </CollapsableWrapper>
                
                <CollapsableModalWrapper 
                    collapseId={CollapseState.TIMEFRAME_SELECT} 
                    defaultStyle="pt-6"
                    openedStyle="space-y-2 pt-2"
                    buttonContent={
                        <FlowRateSelect
                            dropdownValue={store.flowrateUnit}
                            theme={swapTheme}
                        />
                    } 
                    modal={
                        <FlowRateRow
                            theme={swapTheme}
                            setDropdownValue={store.setFlowrateUnit}
                            options={flowrates}
                        />
                    }        
                    customModalHeight='max-h-[30rem]'        
                />

                {
                    store.flowrateUnit?.label === "Pay Once" &&
                    <CollapsableModalWrapper 
                        collapseId={CollapseState.DATE_TIME_SELECT} 
                        defaultStyle="pt-2"
                        openedStyle="space-y-2 pt-2"
                        buttonContent={
                            <DateTimeSelectButton
                                theme={swapTheme}
                            />
                        } 
                        modal={
                            <DateTimeSelect 
                                theme={swapTheme}
                            />
                        }        
                        customModalHeight='max-h-[36rem]'        
                    />
                }

                <CollapsableModalWrapper 
                    collapseId={CollapseState.OUTBOUND_TOKEN_SELECT} 
                    defaultStyle="pt-2"
                    openedStyle="space-y-4 pt-2"
                    buttonContent={
                        <OutboundBox
                            swapTheme={swapTheme}
                        />
                    } 
                    modal={
                        <div className="h-96 overflow-y-auto">
                            <TokenDisplay
                                tokenOption={tokenList}
                                theme={swapTheme}
                                setOutboundToken={store.setOutboundToken}
                                setInboundToken={store.setInboundToken}
                                outbound={true}
                            />
                        </div>
                    }                
                />
                
                <CollapsableWrapper
                    defaultStyle="relative z-50 -my-3"
                >
                    <ActivateSwapArrow
                        swapTheme={swapTheme}
                        overBalance={store.isBalanceUnderSwapAmount()}
                    />
                </CollapsableWrapper>

                <CollapsableModalWrapper 
                    collapseId={CollapseState.INBOUND_TOKEN_SELECT} 
                    defaultStyle=""
                    openedStyle="space-y-4 pt-2"
                    buttonContent={
                        <InboundBox
                            swapTheme={swapTheme}
                        />
                    } 
                    modal={
                        <div className="h-96 overflow-y-auto">
                            <TokenDisplay
                                tokenOption={tokenList}
                                theme={swapTheme}
                                setOutboundToken={store.setOutboundToken}
                                setInboundToken={store.setInboundToken}
                                outbound={false}
                            />
                        </div>
                    }                
                />
                <CollapsableWrapper>
                    {!isLoading && isConnected ? (
                        <SwapButton
                            swapTheme={swapTheme}
                        />
                    ) : (
                        <ConnectWalletButton theme={theme} />
                    )}
                </CollapsableWrapper>
                <ReverseCollapsableWrapper
                    collapseId={CollapseState.WRAP_TOKENS}
                    expectedMaxHeight='max-h-[30rem]'
                >
                    <WrapTokens 
                        theme={swapTheme} 
                    />
                </ReverseCollapsableWrapper>
                <ReverseCollapsableWrapper
                    collapseId={CollapseState.SWAP_APPROVE}
                    expectedMaxHeight='max-h-[36rem]'
                >
                    <Approve 
                        theme={swapTheme} 
                    />
                </ReverseCollapsableWrapper>
                <ReverseCollapsableWrapper
                    collapseId={CollapseState.SWAP_SUBMITTING}
                    expectedMaxHeight='max-h-[30rem]'
                >
                    <SubmittingSwap 
                        theme={swapTheme} 
                    />
                </ReverseCollapsableWrapper>
                <ReverseCollapsableWrapper
                    collapseId={CollapseState.SWAP_SUCCESS}
                    expectedMaxHeight='max-h-[35rem]'
                >
                    <TransactionSuccess 
                        swapTheme={swapTheme} 
                    />
                </ReverseCollapsableWrapper>
                <ReverseCollapsableWrapper
                    collapseId={CollapseState.SWAP_FAILURE}
                    expectedMaxHeight='max-h-[35rem]'
                >
                    <TransactionFailed 
                        swapTheme={swapTheme} 
                    />
                </ReverseCollapsableWrapper>
            </div>
        </DatePickerStateProvider>
    );
};

export default SwapWidget;
