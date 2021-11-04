import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, fieldValue } from '../../../firebase.config'
import { getMeetChat } from '../../../services/MeetService'
import ChatMessage from './ChatMessage'
import firebase from 'firebase'

export interface ChatMessageI {
    id: string
    message: string
    user_id: string
    username: string
    created_at: firebase.firestore.Timestamp
}

const ChatSpace = ({ id }: {id: string}) => {
    
    const [message, setMessage] = useState<string>('')
    const [chat] = useCollectionData<ChatMessageI>(getMeetChat(id)
    .orderBy('created_at'), {idField: 'id'})

    const sendMessage = (e: any) => {
        e.preventDefault()
        getMeetChat(id).add({
            user_id: auth.currentUser?.uid,
            username: auth.currentUser?.displayName ? auth.currentUser?.displayName : auth.currentUser?.email,
            message,
            created_at: fieldValue.serverTimestamp()
        })
        setMessage('')
    }

    return (
        <div className="w-1/5 h-screen bg-gray-500">
            {/* HEADER */}
            <div className="flex justify-center p-4 bg-gray-400">
                Sala de Chat
            </div>
            
            {/* CHAT CONTAINER */}
            <div className="flex flex-col h-5/6 p-2 space-y-2 overflow-auto">
                {
                    chat && chat.map(chatMessage => <ChatMessage 
                        message={chatMessage} type={chatMessage.user_id == auth.currentUser!.uid ? 'sended' : 'received'} key={chatMessage.id}/>
                    )
                }
            </div>
            
            {/* INPUT BUTTON */}
            <form onSubmit={sendMessage} className="flex justify-between bg-gray-400 p-4">
                <input type="text" value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>      
        </div>
    )
}

export default ChatSpace
