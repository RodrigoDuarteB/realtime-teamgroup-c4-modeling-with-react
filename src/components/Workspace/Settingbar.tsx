import React from 'react'
import ToolState from '../../store/ToolState'

import { AiOutlineColumnHeight as LineWidth, 
    AiOutlineBorderBottom as StrokeColor } from 'react-icons/ai'
import IconText from '../Style/IconText'

const Settingbar = () => {

    return (
        <div className="flex p-2 bg-gray-300 space-x-3">
            <Container>
                <IconText text="Grosor">
                    <LineWidth size={30}/>
                </IconText>
                <input id="line-width" type="number" min={1} max={50} defaultValue={1} onChange={e => ToolState.setLineWidth(
                    Number(e.target.value))} 
                    className="text-center"/>
            </Container>
            
            <Container>
                <IconText text="Color del Contorno">
                    <StrokeColor size={30}/>
                </IconText>
                <input onChange={e => ToolState.setStrokeColor(
                    e.target.value)} type="color" id="stroke-color"/>
            </Container>
        </div>
    )
}
export default Settingbar


const Container = ({children}: any) => {

    return (
        <div className="flex items-center space-x-2 bg-primary hover:bg-primary-dark p-2 rounded-md">   
            {children}
        </div>
    )
}
