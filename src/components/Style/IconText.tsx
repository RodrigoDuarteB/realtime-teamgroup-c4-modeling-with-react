import React from 'react'

const IconText = ({text, children}: any) => {
    return (
        <div className="flex flex-col items-center">
            {children}
            <p className="text-xs font-semibold"><small>{text ? text : 'Icon'}</small></p>
        </div>
    )
}

export default IconText
