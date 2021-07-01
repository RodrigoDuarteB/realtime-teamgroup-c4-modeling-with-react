import { makeAutoObservable } from "mobx"
import Tool from "../Tools/Tool"

class ToolState {
    tool!: Tool
    text: any
    
    constructor(){
        makeAutoObservable(this)
    }

    setTool(tool: Tool){
        this.tool = tool
    }

    setFillColor(color: string){
        this.tool.fillColor = color
    }

    setStrokeColor(color: string){
        this.tool.strokeColor = color
    }

    setLineWidth(width: number){
        this.tool.lineWidth = width
    }

    setText(text: string){
        this.text = text
    }

}

export default new ToolState()