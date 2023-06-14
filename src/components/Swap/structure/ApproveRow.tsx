import React from 'react'

const ApproveRow = ({ item, index, swapTheme }) => {

    return (
        <div className='w-full flex flex-row items-start justify-start text-white space-x-5' key={index}>
            <h1
                className='font-bold'
                style={{
                    color: swapTheme.tokenBalance
                }}
            >{item.title}:</h1>
            <h1 className='opacity-80'>{item.data}</h1>
        </div>
    )
}

export default ApproveRow;