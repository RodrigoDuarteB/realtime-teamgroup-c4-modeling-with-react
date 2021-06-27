import React from 'react'
import Canvas from './Canvas'
import Settingbar from './Settingbar'
import Toolbar from './Toolbar'

const Workspace = () => {
    return (
        <div>
            <Toolbar/>
            <Settingbar/>
            <Canvas/>
        </div>
    )
}

export default Workspace
