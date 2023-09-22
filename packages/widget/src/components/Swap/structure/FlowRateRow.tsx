import React from "react";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { defaultTheme } from "../../../theme/theme";
import { Theme } from "../../../theme";
import { useStore } from "../../../store";
import { CollapseState } from "../../../types/CollapseState";
import { FiExternalLink } from "react-icons/fi";
import superfluidLogo from "../../../../public/superfluid-logo.png";

interface OptionButtonProps {
    option: GenericDropdownOption;
    setDropdownValue: ((value: GenericDropdownOption) => void);
    theme?: Theme;
    isSelected: boolean;
}

const OptionButton = ({option, setDropdownValue, theme, isSelected} : OptionButtonProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const store = useStore();

    return (
        <button 
            className={`w-full px-3 py-2 flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-300  bg-white/10 ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
            onClick={() => {
                setDropdownValue(option)
                store.setCollapseState(CollapseState.NONE)
            }}
            style={{
                //backgroundColor: swapTheme.,
                color: swapTheme.primaryText,
                borderRadius: swapTheme.accentBorderRadius,
                fontWeight: swapTheme.accentFontWeight,
                fontFamily: swapTheme.textFont,
            }}
        >
            <h1 className="opacity-75">{option.label}</h1>
        </button>
    )
}

interface FlowRateRowProps {
    options: GenericDropdownOption[];
    setDropdownValue: ((value: GenericDropdownOption) => void);
    theme?: Theme;
}

const FlowRateRow = ({
    options,
    setDropdownValue,
    theme
}: FlowRateRowProps) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };

    const store = useStore();

    const [firstOption, ...remainingOptions] = options;

    return (
        <div className="pt-4">
            <a 
                href={"https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa"}
                className="group pl-5 pr-4 py-4 flex grow items-center justify-center space-x-2 rounded-xl text-white text-sm opacity-75 hover:opacity-100 bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                target="_blank" 
                rel="noopener noreferrer"
            >
                <p className="flex grow">
                    What is a stream?
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
            <div className="border-[1px] p-3 space-y-2 rounded-[1.25rem] border-white/10 mt-6">
                <p className="text-white/60 text-xs p-2">
                    For beginners - automatically wrap your tokens and calculate your flowrate based the selected duration
                </p>
                <OptionButton 
                    key={firstOption.sublabel}
                    option={firstOption} 
                    setDropdownValue={setDropdownValue}
                    theme={theme}
                    isSelected={store.flowrateUnit.label === firstOption.label}
                />
            </div>
            <div className="border-[1px] p-3 space-y-2 rounded-[1.25rem] border-white/10 mt-4 2mb-2">
                <p className="text-white/60 text-xs p-2">
                    For advanced users - manually set your flowrate
                </p>
                <div
                    //theme={swapTheme}
                    //className="p-2"
                    style={{
                        //backgroundColor: swapTheme.streamLengthBox,
                        borderRadius: swapTheme.secondaryBorderRadius,
                    }}
                    className="2pb-2 grid grid-cols-2 gap-x-1 gap-y-1"
                >
                    {remainingOptions.map((option) => (
                        <OptionButton 
                            key={option.sublabel}
                            option={option} 
                            setDropdownValue={setDropdownValue}
                            theme={theme}
                            isSelected={store.flowrateUnit.label === option.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FlowRateRow;
