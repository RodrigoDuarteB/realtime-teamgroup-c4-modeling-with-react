import React, { useState } from 'react'

const Formfield = (props: any) => {
    const [value, setValue] = useState<any>()
    const { id, label, type, classes } = props

    return (
        <div className={`grid grid-rows-2 mt-2 mb-4 ${ classes }`}>
            <label htmlFor={ id }>{ label }</label>
            <div className="border-b border-primary">
                <input type={ type ? type : 'text' } className="input" 
                placeholder={`Introduce ${ label }`} id={ id } onChange={e => setValue(e.target.value)}/>
            </div>
        </div>
    )
}

export default Formfield
