import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import Image from "next/image";
import { GenericDropdownOption } from "../../../types/GenericDropdownOption";
import { TokenOption } from "../../../types/TokenOption";
import { defaultTheme } from '../../../theme/theme'
import { Theme } from "../../../theme";

interface SelectProps {
    options: GenericDropdownOption[] | TokenOption[];
    dropdownValue: GenericDropdownOption | TokenOption;
    setDropdownValue:
    | ((value: GenericDropdownOption) => void)
    | ((token: TokenOption) => void);
    // eslint-disable-next-line react/require-default-props
    isNonSuperToken?: boolean;
    // eslint-disable-next-line react/require-default-props
    selectLabel?: string;
    theme?: Theme;
    setIsPayOnce: (value: boolean) => void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const CenteredSelect = ({
    options,
    dropdownValue,
    setDropdownValue,
    isNonSuperToken,
    selectLabel = "",
    theme,
    setIsPayOnce
}: SelectProps) => {

    const swapTheme: Theme = { ...defaultTheme, ...theme };

    return (
        <Listbox value={dropdownValue} onChange={setDropdownValue}>
            {({ open }) => (
                <div className="relative flex-shrink-0 focus-within:textbox-outline rounded-2xl max-h-[50%]"
                >
                    {selectLabel && (
                        <Listbox.Label className="absolute -top-6">
                            {selectLabel}
                        </Listbox.Label>
                    )}
                    <Listbox.Button className="flex relative w-full items-center justify-center rounded-lg bg-darkGray py-3 pl-4 pr-2 space-x-2 hover:border-aqueductBlue dark:hover:border-aqueductBlue font-bold text-white/75">
                        {dropdownValue.logo && (
                            <Image
                                src={dropdownValue.logo}
                                width="20"
                                height="20"
                                alt="logo"
                            />
                        )}
                        <span className="flex items-center text-xl">
                            <span className="block truncate">
                                {dropdownValue.label}
                            </span>
                        </span>
                        <div className="absolute right-3">
                            <HiChevronDown
                                className={`${open ? '-rotate-180' : ''} h-6 w-6 text-white/75 flex flex-shrink-0 ease-in-out duration-500`}
                                aria-hidden="true"
                            />
                        </div>
                    </Listbox.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Listbox.Options className={`absolute w-full items-center text-center z-50 -mt-2 flex flex-col flex-shrink-0 rounded-lg overflow-auto py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm dark:bg-white/10 dark:backdrop-blur-lg dark:border-red-500`}
                            style={{
                                backgroundColor: swapTheme.tokenBox,
                            }}
                        >
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.value}
                                    className={({ active }) =>
                                        classNames(
                                            `relative cursor-pointer select-none py-3 pl-2 pr-10 w-[95%] rounded-lg mb-3`
                                        )
                                    }
                                    style={{
                                        backgroundColor: swapTheme.useMaxButton,
                                        color: swapTheme.streamLengthText
                                    }}
                                    value={option}
                                >
                                    {({ selected }) => {
                                        if (dropdownValue.label === "Pay Once") {
                                            setIsPayOnce(true);
                                        } else {
                                            setIsPayOnce(false)
                                        }
                                        return (
                                            <div className="flex items-center text-lg justify-center ml-10 space-x-3">
                                                {option.logo && (
                                                    <div className="w-5 h-5">
                                                        <Image
                                                            src={option.logo}
                                                            width={20}
                                                            height={20}
                                                            alt="logo"
                                                        />
                                                    </div>
                                                )}
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-semibold"
                                                    )}
                                                >
                                                    {isNonSuperToken &&
                                                        "underlyingToken" in option &&
                                                        option.underlyingToken
                                                        ? option.underlyingToken.label
                                                        : option.label}
                                                </span>
                                            </div>
                                        )
                                    }}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    )
};

export default CenteredSelect;