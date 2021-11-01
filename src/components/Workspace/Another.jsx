import React, { useEffect, useState } from 'react'
import mf from 'diagram-library'
import { DiagramView, NodeListView } from 'diagram-library-react'

const Another = () => {
    const [diagram, setDiagram] = useState(new mf.Diagramming.Diagram())
    const [nodes, setNodes] = useState([])
    const [captions, setCaptions] = useState(['Actor', 'Rectangle', 'Ellipse'])

    useEffect(() => {
        setNodes(captions.map(shape => {
            let node = new mf.Diagramming.ShapeNode(diagram)
            node.setText(shape)
            node.setShape(shape)
            return node
        }))
    }, [])

    return (
        <div className="flex flex-col w-full">
            <NodeListView
                nodes={nodes}
                captions={captions}
            ></NodeListView>

            <div className="">
                <DiagramView
                    id="diagram1"
                    backBrush="#f2f2f2"
                    diagram={diagram}
                />
            </div>
        </div>
    )
}

export default Another
