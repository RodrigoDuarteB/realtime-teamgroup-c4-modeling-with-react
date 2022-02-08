import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../../firebase'

const AuthProvider = ({ children }: any) => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            setReady(true)
        })
    }, [])

    return (
        <AuthContext.Provider value={ready}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider 
export const AuthContext = createContext<boolean | null>(null)