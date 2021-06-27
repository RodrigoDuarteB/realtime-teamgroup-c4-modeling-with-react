import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="w-full h-14 bg-primary-dark flex justify-between items-center px-4 rounded-b-lg">
            <Link to="/">C4Meet</Link>
            <div className="space-x-2">
                <Link to="/meets">Reuniones</Link>
                <Link to="/login">Usuario</Link>
            </div>
        </nav>
    )
}

export default Header
