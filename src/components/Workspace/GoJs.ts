import * as go from 'gojs'


// Diagram
export function initDiagram() {
    const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram,{
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
              // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { 
            text: 'new node', color: 'lightblue' 
        },
        model: $(go.GraphLinksModel,{
            linkKeyProperty: 'key'  
            // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        })
    });
    
    // define a simple Node template
    diagram.nodeTemplate = $(go.Node, 'Auto', {
        resizable: true,
        /* rotatable: true */
    }, /*the Shape will go around the TextBlock */new go.Binding('location'
    , 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape, 'RoundedRectangle',{ 
        name: 'SHAPE', 
        fill: 'white', 
        strokeWidth: 0, 
        fromLinkable: true, 
        toLinkable: true, 
        portId: "" 
    },/* Shape.fill is bound to Node.data.color */new go.Binding('fill', 
    'color')),$(go.TextBlock,{ 
        margin: 8, 
        editable: true 
    }, /* some room around the text */ new go.Binding('text').makeTwoWay()));


    //determines the link shape
    diagram.linkTemplate = $(go.Link, {
        relinkableFrom: true, 
        relinkableTo: true, 
        reshapable: true, 
        /* routing: go.Link.Orthogonal,*/
        resegmentable: true
    }, $(go.Shape, {
        strokeDashArray: [4, 2]
    }), $(go.Shape, {
        toArrow: 'Standard'
    }), $(go.TextBlock, {
            segmentOffset: new go.Point(0, -10),
            segmentOrientation: go.Link.OrientUpright,
            editable: true
        }, new go.Binding('text').makeTwoWay())
    )
    
    //change the bottom shape of a link
    diagram.toolManager.relinkingTool.fromHandleArchetype = $(go.Shape, "Diamond", 
    { 
        desiredSize: new go.Size(9, 9), 
        stroke: 'green',
        fill: 'lime',
        segmentIndex: 0
    })
    
    //changes the top shape of a link
    diagram.toolManager.relinkingTool.toHandleArchetype = $(go.Shape, "Diamond", 
    { 
        desiredSize: new go.Size(9, 9), 
        stroke: 'red',
        fill: 'pink',
        segmentIndex: -1
    })

    //changes the shape of a temporary link review
    diagram.toolManager.linkingTool.temporaryLink = $(go.Link, {
        layerName: 'Tool'
    }, $(go.Shape, {
        stroke: 'red',
        strokeWidth: 2,
        strokeDashArray: [4, 2]
    }))
              
    return diagram;
}


// Palette
export function initPalette() {
    const $ = go.GraphObject.make
    const pallete = $(go.Palette, {
        layout: $(go.GridLayout, {
            alignment: go.GridLayout.Location
        })
    })
    pallete.nodeTemplate = $(go.Node, 'Vertical', {
        locationObjectName: 'TB', locationSpot: go.Spot.Center
    }, $(go.Shape, {
        width: 60, height: 20, fill: "white" 
    }, new go.Binding("fill", "color")),
    $(go.TextBlock, {
        name: 'TB'
    }, new go.Binding("text", "color")))
    
    return pallete
}