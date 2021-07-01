import { makeAutoObservable } from "mobx"
import Tool from "../Tools/Tool"

class ToolState {
    tool!: Tool
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

}

export default new ToolState()