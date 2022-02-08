import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Header = () => {
    const history = useHistory()
    const [user] = useAuthState(auth)

    const logout = () => {
        auth.signOut()
        .then(r => {
            history.push('/login')
        })
    }


    return (
        <nav className="w-full h-14 bg-primary-dark flex justify-between items-center px-4 rounded-b-lg shadow-lg">
            <Link to="/" className="header-text">C4 Model</Link>
            <div className="space-x-2">
                {
                    user ? (
                        <Fragment>
                            <Link to={`/meets/me/${user.uid}`} className="btn bg-primary-light">Reuniones</Link>
                            <button className="btn bg-primary-light" 
                            onClick={logout}>Logout</button>
                        </Fragment>
                    ) : <Link to="/login" className="header-text">Login</Link>
                }
            </div>
        </nav>
    )
}

export default Header
