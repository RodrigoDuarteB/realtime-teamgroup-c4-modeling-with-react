import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth } from '../../../firebase'
import { getMeetUsersConnected } from '../../../services/MeetService'
import { UserSession } from '../../models/UserSession'
import UserBadge from './UserBadge'

const UsersBar = ({ id }: {id: string}) => {
    
    const [users] = useCollectionData<UserSession>(getMeetUsersConnected(id)
    .orderBy('status', 'desc'), {idField: 'id'})
    const userId = auth.currentUser?.uid

    useEffect(() => {
        getMeetUsersConnected(id).where('user_id', '==', userId).get()
        .then(res => {
            if(!res.empty){
                getMeetUsersConnected(id).doc(res.docs[0].id)
                .update({
                    status: true
                })
            }else{
                getMeetUsersConnected(id).add({
                    user_id: auth.currentUser?.uid,
                    username: auth.currentUser?.displayName ? auth.currentUser?.displayName : auth.currentUser?.email,
                    status: true
                })
            }
        })

        return () => {
            getMeetUsersConnected(id).where('user_id', '==', userId).get()
            .then(res => {
                if(!res.empty){
                    getMeetUsersConnected(id).doc(res.docs[0].id)
                    .update({
                        status: false
                    })
                }
            })
        }
    }, [])

    return (
        <div className="flex flex-row space-x-2 bg-gray-800">
            {
                users && users.map(u => <UserBadge user={u} key={u.id}/>)
            }
        </div>
    )
}

export default UsersBar
