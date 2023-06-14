import React from 'react'
import { Theme } from '../../../theme';
import flowrates from "../../../utils/flowrates";
import { CSSTransition } from 'react-transition-group';
import { useStore } from '../../../store';
import FlowRateRow from './FlowRateRow';

interface FlowRateContainerProps {
    swapTheme: Theme;
    isPayOnce: boolean;
    isEntered: boolean;
    flowRateDropDown: boolean;
    setFlowRateDropDown: (value: boolean) => void;
}

const FlowRateContainer = ({
    swapTheme,
    isPayOnce,
    isEntered,
    flowRateDropDown,
    setFlowRateDropDown
}: FlowRateContainerProps) => {

    const store = useStore()

    return (
        <div className={`${isPayOnce ? `${isEntered ? 'h-[57.5%]' : 'h-[50%]'}` : `${isEntered ? 'h-[52%]' : 'h-[42%]'}`} ${flowRateDropDown ? '' : 'hidden'} 
        absolute bottom-8 w-[89%] z-[100] `}
            style={{
                borderRadius: swapTheme.secondaryBorderRadius,
            }}
        >
            <CSSTransition
                in={flowRateDropDown}
                appear={true}
                timeout={300}
                classNames={{
                    enter: 'opacity-0',
                    enterActive: 'opacity-100 transition-opacity duration-300 ease-in-out',
                    exitActive: 'opacity-0 transition-opacity duration-300 ease-in-out',
                    exit: 'opacity-00',
                }}
                unmountOnExit
            >
                <FlowRateRow
                    theme={swapTheme}
                    setDropdownValue={store.setFlowrateUnit}
                    options={flowrates}
                    setFlowRateDropDown={setFlowRateDropDown}
                />
            </CSSTransition>
        </div>
    )
}

export default FlowRateContainer;