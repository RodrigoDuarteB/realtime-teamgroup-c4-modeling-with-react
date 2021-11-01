import React from "react"
import { Link } from "react-router-dom"

const Meet = ({ data }: any) => {

    return (
        <div className="border border-gray-200 rounded-md shadow-md my-2 p-4 space-y-2"> 
            <li>Titulo: <span className="font-semibold">{ data.title }</span></li>
            <li>Fecha: <span className="font-semibold">{ data.created_at.toDate().toLocaleDateString() }</span></li>
            <Link to={`/meets/${data.id}`} className="btn bg-primary-dark hover:bg-primary block text-center">Editar</Link>
        </div>
    )
}

export default Meet
