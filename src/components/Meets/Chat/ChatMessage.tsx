import React from 'react'
import { ChatMessageI } from './ChatSpace'

interface Props {
    message: ChatMessageI;
    type: string;
}

const ChatMessage = ({ message, type }: Props) => {

    const colors = ['gray', 'red', 'yellow', 'blue', 'indigo', 'purple', 'pink']

    const handleType = () => {
        if(type == "sended"){
            return 'self-end bg-green-600'
        }else{
            return 'self-start bg-'+colors[Math.floor(Math.random() * colors.length)]+'-600'
        }
    }

    return (
        <div className={`flex flex-col w-auto max-w-4/5 rounded-xl px-2 py-1 ${handleType()}`}>
            <p style={{fontSize: 12}}>{type == "sended" ? 'Tú' : message.username}</p>
            <p className="font-semibold">{message.message}</p> 
            <p style={{fontSize: 12}} className="self-end">{message.created_at ? message.created_at.toDate().toLocaleTimeString().substring(0, 5) : ''}</p>
        </div>
    )
}

export default ChatMessage
