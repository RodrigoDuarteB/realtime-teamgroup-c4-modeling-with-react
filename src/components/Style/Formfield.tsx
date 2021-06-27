import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Formfield = (props: any) => {
    const [value, setValue] = useState<any>()
    const { id, label, type } = props

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(value)
        //dispatch(() => {value})
    }, [value])

    return (
        <div className="grid grid-rows-2 my-2">
            <label htmlFor={ id }>{ label }</label>
            <div className="border-b border-primary">
                <input type={ type ? type : 'text' } className="input" placeholder={`Introduce ${ label }`} id={ id } onChange={e => setValue(e.target.value)}/>
            </div>
        </div>
    )
}

export default Formfield
