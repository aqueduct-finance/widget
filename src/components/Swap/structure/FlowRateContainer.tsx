import React from "react";
import { CSSTransition } from "react-transition-group";
import { Theme } from "../../../theme";
import flowrates from "../../../utils/flowrates";
import { useStore } from "../../../store";
import FlowRateRow from "./FlowRateRow";

interface FlowRateContainerProps {
    swapTheme: Theme;
    isEntered: boolean;
    flowRateDropDown: boolean;
    setFlowRateDropDown: (value: boolean) => void;
}

const FlowRateContainer = ({
    swapTheme,
    isEntered,
    flowRateDropDown,
    setFlowRateDropDown,
}: FlowRateContainerProps) => {
    const store = useStore();

    return (
        <div
            className={`${
                store.flowrateUnit?.label === "Pay Once"
                    ? `${isEntered ? "h-[59%]" : "h-[51.5%]"}`
                    : `${isEntered ? "h-[53.5%]" : "h-[43.5%]"}`
            } ${flowRateDropDown ? "" : "hidden"} 
        absolute bottom-8 left-[1.75rem] right-[1.75rem] z-[40]`}
            style={{
                borderRadius: swapTheme.secondaryBorderRadius,
            }}
        >
            <CSSTransition
                in={flowRateDropDown}
                appear
                timeout={300}
                classNames={{
                    enter: "opacity-0",
                    enterActive:
                        "opacity-100 transition-opacity duration-300 ease-in-out",
                    exitActive:
                        "opacity-0 transition-opacity duration-300 ease-in-out",
                    exit: "opacity-00",
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
    );
};

export default FlowRateContainer;
