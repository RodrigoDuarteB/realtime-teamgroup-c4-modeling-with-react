import { ReactPalette } from 'gojs-react'
import React from 'react'
import { initPalette } from './GoJs';

const Palette = () => {

    return (
        <ReactPalette 
            initPalette={initPalette}
            nodeDataArray={[
                { key: "IR", color: "indianred" },
                { key: "LC", color: "lightcoral" },
                { key: "S", color: "salmon" },
                { key: "DS", color: "darksalmon" },
                { key: "LS", color: "lightsalmon" },
                { category: 'Conditional', text: 'Cond' }
            ]}
            divClassName="h-screen w-24"
        />
    )
}

export default Palette
