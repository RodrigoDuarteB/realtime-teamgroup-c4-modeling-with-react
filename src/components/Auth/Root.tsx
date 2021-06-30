import React, { useContext } from 'react'
import { AuthContext } from '../Application/AuthProvider'
import Loading from '../Style/Loading'

const Root = ({ children }: any) => {
    const ready = useContext(AuthContext)

    return ready ? (
        children
    ) : (
        <Loading />
    )
}

export default Root
