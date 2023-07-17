import { Theme } from "../../../theme";
import { defaultTheme } from '../../../theme/theme'
import React from "react";
import { SwapText } from "../../../theme/animation";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useErc20Contract from "../helpers/useErc20Contract";
import { parseEther } from 'viem'
import { waitForTransaction } from '@wagmi/core'

interface WrapTokensProps {
    theme: Theme;
}

const WrapTokens = ({
    theme
}: WrapTokensProps) => {
    const store = useStore()

    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const underlyingTokenContract = useErc20Contract(store.outboundToken?.underlyingToken?.address);
    //const tokenContract = useSuperToken(store.outboundToken?.address);

    const handleApproveClick = async () => {
        if (underlyingTokenContract && store.outboundToken) {
            try {
                // approve tokens
                const upgradeTokenAddress = store.outboundToken.address;
                const minAmountToWrap = store.getAmountNeededToWrap();
                const formattedMinAmountToWrap: `${number}` = `${minAmountToWrap}`;
                const approvedTransactionHash = await underlyingTokenContract.write.approve([upgradeTokenAddress, parseEther(formattedMinAmountToWrap)]);
                await waitForTransaction({ hash: approvedTransactionHash })

                // if successful, update allowance and move to next step
                store.setUnderlyingOutboundTokenAllowance(minAmountToWrap);
                store.setCollapseState(CollapseState.SWAP_APPROVE);
            } catch (e) {

            }
        }
    };

    return (
        <div className={`flex flex-col w-full items-start justify-start 2px-2 2md:px-6 2py-5 space-y-8 `}
            style={{
                transitionDuration: swapTheme.primaryDuration
            }}
        >
            <div className="px-2 md:px-6 pt-5 space-y-6 w-full">
                <div className="w-full flex flex-col 2flex-row 2items-center justify-between text-2xl"
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
                    <h1>Approve Wrapper</h1>
                </div>
                <WrapTokensMessage
                    swapTheme={swapTheme}
                />
            </div>
            <button className={`w-full `}
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
                <SwapText swapTheme={swapTheme} showAnimation={false}>Approve {store.outboundToken?.symbol}</SwapText>
            </button>
        </div>
    )

}


const WrapTokensMessage = ({swapTheme}: {swapTheme: Theme}) => {

    const store = useStore();

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
                {`You need to wrap at least ${store.getAmountNeededToWrap().toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${store.outboundToken?.underlyingToken?.symbol} into ${store.outboundToken?.symbol} to cover ${store.flowrateUnit.sublabel == 'once' ? 'your swap.' : '10 hours of streaming.'} To avoid this step in the future, approve the max amount.`}
            </p>
        </div>
    );
}

export default WrapTokens;