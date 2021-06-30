import React from "react"
import { Link } from "react-router-dom"

const Meet = (props: any) => {
    const { key, data } = props

    return (
        <div key={key} className="h-auto w-auto border shadow-md p-2"> 
            <li>{ data.title }</li>
            <p>Fecha: {data.created_at}</p>
            <Link to={`/meets/${data.id}`} className="btn">Ir</Link>
        </div>
    )
}

export default Meet
