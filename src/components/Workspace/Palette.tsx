import { ReactPalette } from 'gojs-react'
import React from 'react'
import { initPalette } from './GoJs';

const Palette = () => {

    return (
        <ReactPalette 
            initPalette={initPalette}
            nodeDataArray={[
                { category: 'Start', text: 'User' },
				{ text: 'Sistema' },
				{ category: 'Comment', text: 'Comment' }
            ]}
            divClassName="h-32 w-full bg-gray-300"
        />
    )
}

export default Palette
