import React from 'react'
import { useParams } from 'react-router-dom'
import Title from '../Application/Title'
import Canvas from './Canvas'
import Settingbar from './Settingbar'
import Toolbar from './Toolbar'

const Workspace = () => {
    const params: any = useParams()

    return (
        <div>
            <Title title={`Meet - ${params.id}`}/>
            <Toolbar/>
            <Settingbar/>
            <Canvas/>
        </div>
    )
}

export default Workspace
