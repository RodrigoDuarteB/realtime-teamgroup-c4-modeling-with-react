import React from "react"
import { Link } from "react-router-dom"

const Meet = ({ data }: any) => {

    return (
        <div key={data.id} className="border border-gray-500 mb-1 p-4"> 
            <li>{ data.title }</li>
            <p>Fecha: { data.created_at.toDate().toDateString() }</p>
            <Link to={`/meets/${data.id}`} className="btn">Ir</Link>
        </div>
    )
}

export default Meet
