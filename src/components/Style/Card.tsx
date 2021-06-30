import React from 'react'
import Center from './Center'

const Card = (props: any) => {
    const { classes, children } = props
    return (
        <div className={`rounded-md border shadow-lg p-4 ${classes}`}>
            { children }
        </div>
    )
}

export default Card
