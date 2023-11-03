import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React from "react";
//import { SwapText } from "../../../theme/animation";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";
import { FiChevronLeft, FiExternalLink } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useErc20Contract from "../helpers/useErc20Contract";
import { waitForTransaction } from '@wagmi/core'
import superfluidLogo from "../../../../public/superfluid-logo.png";
import DynamicInputBox from "./DynamicInputBox";
import parseTokenAmount from "../../../utils/parseTokenAmount";

const WrapTokensMessage = ({swapTheme}: {swapTheme: Theme}) => {

    const store = useStore();

    const getMessage = () => {
        // user has already approved enough tokens, so they don't need to do anything here
        if (store.getManualAmountNeededToApproveForWrap() == 0) return 'You\'ve already approved a sufficient amount, so we\'ll automatically wrap your tokens when you start your stream';

        // user hasn't approved enough tokens
        if (store.getAmountNeededToWrap() > 0) return `You need to wrap at least ${store.getAmountNeededToWrap().toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${store.outboundToken?.underlyingToken?.symbol} into ${store.outboundToken?.symbol} to cover ${store.flowrateUnit.sublabel == 'once' ? 'your swap.' : '10 hours of streaming.'} To avoid this step in the future, approve the max amount`;
        
        // user doesn't need to wrap any tokens, but they've opted to wrap some anyways
        return 'To avoid this step in the future, approve the max amount. Once you\'ve approved a sufficient amount, we\'ll automatically wrap your tokens when you start your stream';
    }

    return (
        <div 
            className="flex rounded-2xl bg-red-500/50 p-4 text-sm space-x-4 items-center justify-center"
            style={{
                //borderRadius: swapTheme.primaryBorderRadius
                backgroundColor: swapTheme.streamLengthBox,
                color: swapTheme.accentText,
            }}
        >
            <div className="text-white/30">
                <AiOutlineInfoCircle size={20} />
            </div>
            <p className="">
                {getMessage()}
            </p>
        </div>
    );
}

interface WrapTokensProps {
    theme: Theme;
}

const ManualWrapTokens = ({
    theme
}: WrapTokensProps) => {
    const store = useStore()

    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const underlyingTokenContract = useErc20Contract(store.outboundToken?.underlyingToken?.address);
    //const tokenContract = useSuperToken(store.outboundToken?.address);

    const handleApproveClick = async () => {
        if (underlyingTokenContract && store.outboundToken) {
            // if skipping, move to next step and return
            if (store.manualWrapAmount == 0) {
                store.setCollapseState(CollapseState.SWAP_APPROVE);
                return;
            }

            try {
                // approve tokens
                const upgradeTokenAddress = store.outboundToken.address;
                const amountToWrap = store.manualWrapAmount;
                const parsedTokenAmount = parseTokenAmount({
                    token: store.outboundToken.underlyingToken,
                    amount: `${amountToWrap}`
                });
                // TODO: handle native token (eth/matic)
                const approvedTransactionHash = await underlyingTokenContract.write.approve([upgradeTokenAddress, parsedTokenAmount]);
                await waitForTransaction({ hash: approvedTransactionHash })

                // if successful, update allowance and move to next step
                store.setUnderlyingOutboundTokenAllowance(amountToWrap);
                store.setCollapseState(CollapseState.SWAP_APPROVE);
            } catch (e) {
                console.log(e)
            }
        }
    };

    const getButtonText = () => {
        if (store.manualWrapAmount < store.getAmountNeededToWrap()) return 'Insufficient wrap amount';
        if (store.manualWrapAmount == 0) return 'Skip this step';

        return `Approve ${store.outboundToken?.symbol}`;
    }

    return (
        <div className={`flex flex-col w-full items-start justify-start 2px-2 2md:px-6 2py-5 space-y-10 `}
            style={{
                transitionDuration: swapTheme.primaryDuration
            }}
        >
            <div className="px-2 md:px-6 pt-5 space-y-3 w-full">
                <div className="w-full flex flex-col 2flex-row 2items-center justify-between text-2xl pb-4"
                    style={{
                        color: swapTheme.TitleColor,
                        fontWeight: swapTheme.accentFontWeight
                    }}
                >
                    <button 
                        className="flex items-center justify-center space-x-1 text-xs w-min pr-4 pl-3 py-2 rounded-full -ml-2 mb-2 hover:scale-105 duration-300 transition-all"
                        onClick={() => store.setCollapseState(CollapseState.NONE)}
                        style={{
                            backgroundColor: swapTheme.streamLengthBox,
                            color: swapTheme.accentText,

                        }}
                    >
                        <FiChevronLeft />
                        <p>back</p>
                    </button>
                    <h1>Wrap to Super Tokens</h1>
                </div>
                <div className="h-[104px] flex items-center justify-center monospace-font font-bold" >
                    <DynamicInputBox
                        swapTheme={swapTheme}
                        paddingPercentage={0.15}
                        setDynamicInput={store.setManualWrapAmount}
                        dynamicInput={store.manualWrapAmount}
                    />
                </div>
                <a 
                    href={"https://docs.superfluid.finance/superfluid/developers/super-tokens"}
                    className="group pl-5 pr-4 py-4 flex grow items-center justify-center space-x-2 rounded-xl text-white text-sm opacity-75 hover:opacity-100 bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <p className="flex grow">
                        What is a super token?
                    </p>
                    <FiExternalLink />
                    <img
                        src={superfluidLogo}
                        width="20"
                        height="20"
                        alt="superfluid logo"
                        className="2opacity-75 2group-hover:opacity-100 2transition-all 2duration-300"
                    />
                </a>
                <WrapTokensMessage
                    swapTheme={swapTheme}
                />
            </div>
            <button className={`w-full disabled:opacity-50`}
                onClick={handleApproveClick}
                style={{
                    backgroundColor: swapTheme.swapButton,
                    color: swapTheme.swapButtonText,
                    fontSize: swapTheme.swapButtonFontSize,
                    padding: swapTheme.swapButtonPadding,
                    fontWeight: swapTheme.secondaryFontWeight,
                    borderRadius: swapTheme.swapButtonRadius,
                    transitionDuration: swapTheme.primaryDuration
                }}
                disabled={store.manualWrapAmount < store.getAmountNeededToWrap()}
            >
                {getButtonText()}
            </button>
        </div>
    )

}

export default ManualWrapTokens;