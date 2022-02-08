import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const Auth = ({ children }: any) => {
    const [user] = useAuthState(auth)

    return user ? (
        children
    ) : <Fragment /> 
}

export default Auth
