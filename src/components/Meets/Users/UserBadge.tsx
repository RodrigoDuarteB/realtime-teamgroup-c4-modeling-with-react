import React, { Fragment } from 'react'
import { auth } from '../../../firebase'
import { UserSession } from '../../models/UserSession'

interface Props {
    user: UserSession
}

const UserBadge = ({ user }: Props) => {
    return (
        <div className="flex items-center space-x-2 rounded-md bg-white m-3 px-2">
            <div className={`w-3 h-3 rounded-xl bg-${user.status ? 'green' : 'primary-dark'}-600`}></div>
            <p className="py-2">{auth.currentUser?.uid == user.user_id ? 'Tú' : user.username}</p>
        </div>
    ) 
}

export default UserBadge
