import React, { Fragment, useEffect, useState } from 'react'

const Alert = ({text, type, classes, long}: any) => {
    const [show, setShow] = useState(true)
    const [colors, setColors] = useState<string[]>([])

    const setColor = () => {
        switch (type) {
            case 'success':
                setColors(['bg-green-400' , 'text-green-900'])
                break
            case 'error':
                setColors(['bg-red-400', 'text-red-800'])
                break
            default:
                setColors(['bg-green-400' , 'text-green-900'])
        }
    }

    useEffect(() => {
        setColor()
        setTimeout(() => {
            setShow(false)
        }, long ? Number(long)*1000 : 3000)
    }, [])

    return show ? (
        <div className={`p-4 text-center w-auto ${colors[0]} ${classes}`}>
            <p className={`font-semibold text-md ${colors[1]}`}>{text ? text : 'No message'}</p>
        </div>
    ) : <Fragment/>
}

export default Alert
