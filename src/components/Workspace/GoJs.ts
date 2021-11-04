import * as go from 'gojs'

const $ = go.GraphObject.make;

// Diagram
const diagram = $(go.Diagram,{
    'undoManager.isEnabled': true,  
    model: $(go.GraphLinksModel,{
        linkKeyProperty: 'key' 
    })
})

export function initDiagram() {

    const linkable = {
        fromLinkable: true, 
        toLinkable: true, 
        portId: "" 
    }

    diagram.nodeTemplate = $(
        go.Node, 
        'Auto', 
        {
            resizable: true,
            /* rotatable: true */
        }, 
        new go.Binding('location', 
            'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(
            go.Shape, 
            'RoundedRectangle',
            { 
                name: 'SHAPE', 
                fill: 'white', 
                strokeWidth: 0, 
                ...linkable
            },
            new go.Binding('width').makeTwoWay(),
            new go.Binding('height').makeTwoWay(),
            new go.Binding('fill','color')
            ),
        $(go.TextBlock,
            { 
                margin: 20, 
                editable: true 
            }, /* some room around the text */ 
            new go.Binding('text').makeTwoWay()
        )
    );


    const nodeStyle = () => [
        new go.Binding('location', 'loc', go.Point.parse)
        .makeTwoWay(go.Point.stringify),
        {
            locationSpot: go.Spot.Center
        }
    ]

    const textStyle = () => ({
        font: 'bold 14px Lato, Helvetica, Arial, sans-serif',
        stroke: '#000000'
    });


    //add other types of nodes
    diagram.nodeTemplateMap.add(
        '',
        $(
            go.Node,
            'Table',
            nodeStyle(),
            $(
                go.Panel,
                'Auto',
                $(
                    go.Shape,
                    'Rectangle',
                    { 
                        fill: '#91d5ff', 
                        stroke: '#000000', 
                        strokeWidth: 1, 
                        ...linkable
                    },
                    new go.Binding('figure', 'figure'),
                    new go.Binding('width').makeTwoWay(),
                    new go.Binding('height').makeTwoWay(),
                ),
                $(
                    go.TextBlock,
                    textStyle(),
                    {
                        margin: 8,
                        maxSize: new go.Size(200, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding('text').makeTwoWay()
                )
            )
        )
    );

    diagram.nodeTemplateMap.add(
        'Conditional',
        $(
            go.Node,
            'Table',
            nodeStyle(),
            $(
                go.Panel,
                'Auto',
                $(
                    go.Shape,
                    'Diamond',
                    { 
                        fill: '#91d5ff', 
                        stroke: '#000000', 
                        strokeWidth: 1,
                        ...linkable 
                    },
                    new go.Binding('figure', 'figure')
                ),
                $(
                    go.TextBlock,
                    textStyle(),
                    {
                        margin: 8,
                        maxSize: new go.Size(200, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding('text').makeTwoWay()
                )
            )
        )
    );

    diagram.nodeTemplateMap.add(
        'Start',
        $(
            go.Node,
            'Table',
            nodeStyle(),
            $(
                go.Panel,
                'Spot',
                $(go.Shape, 'Circle', {
                    desiredSize: new go.Size(70, 70),
                    fill: '#91d5ff',
                    stroke: '#000000',
                    strokeWidth: 1,
                    ...linkable
                }),
                $(go.TextBlock, 'Start', textStyle(), new go.Binding('text'))
            )
        )
    );

    diagram.nodeTemplateMap.add(
        'End',
        $(
            go.Node,
            'Table',
            nodeStyle(),
            $(
                go.Panel,
                'Spot',
                $(go.Shape, 'Circle', {
                    desiredSize: new go.Size(60, 60),
                    fill: '#91d5ff',
                    stroke: '#000000',
                    strokeWidth: 1,
                    ...linkable
                }),
                $(go.TextBlock, 'End', textStyle(), new go.Binding('text'))
            )
        )
    );

    go.Shape.defineFigureGenerator('File', (shape, w, h) => {
        const geo = new go.Geometry();
        const fig = new go.PathFigure(0, 0, true);
        geo.add(fig);
        fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0));
        fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
        fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
        fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
        const fig2 = new go.PathFigure(0.75 * w, 0, false);
        geo.add(fig2);
        fig2.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.25 * h));
        fig2.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
        geo.spot1 = new go.Spot(0, 0.25);
        geo.spot2 = go.Spot.BottomRight;
        return geo;
    });

    diagram.nodeTemplateMap.add(
        'Comment',
        $(
            go.Node,
            'Auto',
            nodeStyle(),
            $(go.Shape, 'File', {
                fill: '#91d5ff',
                stroke: '#000000',
                strokeWidth: 1
            }),
            $(
                go.TextBlock,
                textStyle(),
                {
                    margin: 8,
                    maxSize: new go.Size(240, NaN),
                    wrap: go.TextBlock.WrapFit,
                    textAlign: 'center',
                    editable: true
                },
                new go.Binding('text').makeTwoWay()
            )
        )
    );


    //determines the link shape
    diagram.linkTemplate = $(
        go.Link, 
        {
            relinkableFrom: true, 
            relinkableTo: true, 
            reshapable: true, 
            /* routing: go.Link.Orthogonal,*/
            resegmentable: true
        }, 
        $(
            go.Shape, 
            {
                strokeDashArray: [4, 2]
            }
        ), 
        $(
            go.Shape, 
            {
                toArrow: 'Standard'
            }
        ), 
        $(
            go.TextBlock, 
            {
                segmentOffset: new go.Point(0, -10),
                segmentOrientation: go.Link.OrientUpright,
                editable: true,
                font: 'bold 14px Lato, Helvetica, Arial, sans-serif',
                stroke: '#000000'
            }, 
            new go.Binding('text').makeTwoWay()
        )
    )
    
    //change the bottom shape of a link
    diagram.toolManager.relinkingTool.fromHandleArchetype = $(
        go.Shape, 
        "Diamond", 
        { 
            desiredSize: new go.Size(9, 9), 
            stroke: 'green',
            fill: 'lime',
            segmentIndex: 0
        }
    )
    
    //changes the top shape of a link
    diagram.toolManager.relinkingTool.toHandleArchetype = $(
        go.Shape, 
        "Diamond", 
        { 
            desiredSize: new go.Size(9, 9), 
            stroke: 'red',
            fill: 'pink',
            segmentIndex: -1
        }
    )

    //changes the shape of a temporary link review
    diagram.toolManager.linkingTool.temporaryLink = $(
        go.Link, 
        {
            layerName: 'Tool'
        }, $(
            go.Shape, 
            {
                stroke: 'red',
                strokeWidth: 2,
                strokeDashArray: [4, 2]
            }
        )
    )
              
    return diagram;
}


// Palette
const animateFadeDown = (e: any) => {
    const animation = new go.Animation();
    animation.isViewportUnconstrained = true;
    animation.easing = go.Animation.EaseOutExpo;
    animation.duration = 100;
    animation.add(
        e.diagram,
        'position',
        e.diagram.position.copy().offset(0, 200),
        e.diagram.position
    );
    animation.add(e.diagram, 'opacity', 0, 1);
    animation.start();
}

const palette = $(go.Palette, {
    'animationManager.initialAnimationStyle': go.AnimationManager.None,
    InitialAnimationStarting: animateFadeDown,
    nodeTemplateMap: diagram.nodeTemplateMap
})

export function initPalette() {
    palette.nodeTemplate = $(
        go.Node,
        'Vertical', 
        $(
            go.Shape, 
            { fill: 'red' }, 
            new go.Binding('fill', 'color')
        ),
        $(
            go.TextBlock, 
            { stroke: 'black' }, 
            new go.Binding('text').makeTwoWay()
        )
    )
    return palette
}