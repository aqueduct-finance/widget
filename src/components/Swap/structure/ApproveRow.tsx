import React from 'react'

const ApproveRow = ({ item, index, swapTheme }) => {

    return (
        <div className='w-full flex flex-row items-start justify-start space-x-5' key={index} >
            <p
                className='font-light'
                style={{
                    //fontWeight: swapTheme.accentFontWeight,
                    color: swapTheme.accentText,
                }}
            >
                {item.title}:
            </p>
            <p 
                style={{
                    color: swapTheme.primaryText,
                }}
            >
                {item.data}
            </p>
        </div>
    )
}

export default ApproveRow;