import { makeAutoObservable } from "mobx"

class ToolState {
    tool
    constructor(tool?: any){
        makeAutoObservable(this)
        this.tool = tool
    }

    setTool(tool: any){
        this.tool = tool
    }

    setFillColor(color: any){
        this.tool.fillColor = color
    }

    setStrokeColor(color: any){
        this.tool.strokeColor = color
    }

    setLineWidth(width: any){
        this.tool.lineWidth = width
    }

}

export default new ToolState()