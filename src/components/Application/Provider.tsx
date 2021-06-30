import React, { createContext, useState } from 'react'

const Provider = ({ children }: any) => {
    const [state, setState] = useState({})

    return (
        <AppContext.Provider value={[state, setState]}>
            { children }
        </AppContext.Provider>
    )
}

export default Provider
export const AppContext = createContext<[{}, React.Dispatch<React.SetStateAction<{}>> | null]>
([{}, null])