import React from 'react'
import { useParams } from 'react-router-dom'
import Title from '../Application/Title'
import Canvas from './Canvas'
import Settingbar from './Settingbar'
import Toolbar from './Toolbar'
import UsersBar from '../Meets/Users/UsersBar'
import ChatSpace from '../Meets/Chat/ChatSpace'

const Workspace = () => {
    const params: any = useParams()

    return (
        <div>
            <Title title={`Meet - ${params.id}`}/>
            <Toolbar/>
            <Settingbar/>
            <UsersBar id={params.id} />
            <div className="flex h-screen">
                <Canvas />
                <ChatSpace id={params.id}/>
            </div>
        </div>
    )
}

export default Workspace
