import React, { useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router'
import { auth } from '../../../firebase.config'
import { getMeetUsersConnected } from '../../../services/MeetService'
import { UserSession } from '../../models/UserSession'
import UserBadge from './UserBadge'

const UsersBar = () => {
    
    const params: {id: string} = useParams()
    const [users] = useCollectionData<UserSession>(getMeetUsersConnected(params.id)
    .orderBy('status', 'desc'), {idField: 'id'})

    useEffect(() => {
        getMeetUsersConnected(params.id).where('user_id', '==', auth.currentUser?.uid).get()
        .then(res => {
            if(!res.empty){
                getMeetUsersConnected(params.id).doc(res.docs[0].id)
                .update({
                    status: true
                })
            }else{
                getMeetUsersConnected(params.id).add({
                    user_id: auth.currentUser?.uid,
                    username: auth.currentUser?.displayName ? auth.currentUser?.displayName : auth.currentUser?.email,
                    status: true
                })
            }
        })

        return () => {
            getMeetUsersConnected(params.id).where('user_id', '==', auth.currentUser?.uid).get()
            .then(res => {
                if(!res.empty){
                    getMeetUsersConnected(params.id).doc(res.docs[0].id)
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
