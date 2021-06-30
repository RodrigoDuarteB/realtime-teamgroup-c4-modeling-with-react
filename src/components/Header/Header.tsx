import React, { useEffect, useState, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, store } from '../../firebase.config'
import { useAuthState } from 'react-firebase-hooks/auth'

const Header = () => {
    const history = useHistory()
    const [user] = useAuthState(auth)

    const logout = () => {
        auth.signOut()
        .then(r => {
            store.collection('log').add({
                user_id: user!.uid,
                created_at: new Date(),
                type: 'LOGOUT'
            })
            .then(r => console.log('log registered'))
            .catch(e => console.log(e))
            history.push('/login')
        })
    }


    return (
        <nav className="w-full h-14 bg-primary-dark flex justify-between items-center px-4 rounded-b-lg shadow-lg">
            <Link to="/" className="header-text">C4Meet</Link>
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
