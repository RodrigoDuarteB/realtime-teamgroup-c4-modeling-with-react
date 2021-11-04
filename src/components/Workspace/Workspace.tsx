import React from 'react'
import { useParams } from 'react-router'
import Title from '../Application/Title'
import ChatSpace from '../Meets/Chat/ChatSpace'
import UsersBar from '../Meets/Users/UsersBar'
import Diagram from './Diagram'
import Palette from './Palette'

const Workspace = () => {

    const params: {id: string} = useParams()

    return (
        <div className="h-screen w-full">
            <Title title={`Meet - ${params.id}`}/>
            <div className="flex">
                <div className="w-4/5">
                    <UsersBar id={params.id}/>
                    <Diagram id={params.id}/>
                </div>
                <ChatSpace id={params.id}/>
            </div>
        </div>
    )
}

export default Workspace
