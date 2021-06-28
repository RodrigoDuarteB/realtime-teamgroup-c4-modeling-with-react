import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase.config'

const Header = () => {
    const history = useHistory()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUser(user)
                console.log(user)
            }
        })
    }, [])

    const logout = () => {
        auth.signOut()
        setUser(null)
        history.push('/login')
    }

    return (
        <nav className="w-full h-14 bg-primary-dark flex justify-between items-center px-4 rounded-b-lg">
            <Link to="/">C4Meet</Link>
            <div className="space-x-2">
                <Link to="/meets">Reuniones</Link>
                {
                    user ? (
                        <button className="btn bg-primary-light" 
                        onClick={logout}>Logout</button>
                    ) : (
                        <Link to="/login">Usuario</Link>  
                    )
                }
            </div>
        </nav>
    )
}

export default Header
