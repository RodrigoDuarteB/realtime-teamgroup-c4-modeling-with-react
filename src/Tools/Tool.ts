export default class Tool {
    canvas 
    context
    constructor(canvas: any){
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.destroyEvents()
    }

    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}