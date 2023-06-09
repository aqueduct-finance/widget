import React from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const SettingsOption = ({ item, index, swapTheme }) => {

    return (
        <div
            className={`flex flex-row ease-in-out px-4 py-4 duration-100 mt-5`}
            style={{
                borderColor: swapTheme.borderColor,
                borderBottomWidth: index === 1 || index === 2 ? swapTheme.borderWidth : '',
                borderTopWidth: index === 1 ? swapTheme.borderWidth : ''
            }}
            key={index}
        >
            <div className="flex flex-row w-full items-center px-1 justify-start space-x-3">
                <h1 className="text-xl text-white cursor-default font-semibold">{item.title}</h1>
                <IoMdInformationCircleOutline className='mt-0.5 cursor-pointer'
                    style={{
                        color: swapTheme.tokenBalance
                    }}
                />
            </div>
            <div className={`w-[80px] h-[35px] px-1 py-1 items-start flex rounded-2xl bg-red-500 ease-in-out duration-300 cursor-pointer`}
                style={{
                    backgroundColor: item.state ? swapTheme.swapButton : swapTheme.useMaxButton
                }}
                onClick={() => {
                    item.setState(!item.state)
                }}
            >
                <div className={`${item.state ? 'translate-x-7' : 'translate-x-0'} w-[30px] h-full rounded-full transition-all duration-300`}
                    style={{
                        backgroundColor: item.state ? swapTheme.primaryText : swapTheme.tokenBalance
                    }}
                />
            </div>
        </div>
    )
};

export default SettingsOption;