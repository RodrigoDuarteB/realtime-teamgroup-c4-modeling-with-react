import React from 'react'

const Centered = ({ children, classes }: any) => {
    return (
        <div className={`h-screen flex justify-center place-items-center ${classes}`}>
            {children}
        </div>
    )
}

export default Centered
