import React from 'react'

const Center = ({ children, classes }: any) => {

    return (
        <div className={`flex justify-center ${classes}`}>
            {children}
        </div>
    )
}

export default Center
