import React from 'react'

const Card = (props: any) => {
    const { children } = props
    return (
        <div className="flex justify-center">
            <div className="mt-8 rounded-md h-96 w-96 border shadow-lg p-4">
                { children }
            </div>
        </div>
    )
}

export default Card
