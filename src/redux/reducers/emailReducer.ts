import { Action } from './../Action'
const defaultValue = ''

const reducer = (state = defaultValue, { type, payload }: Action) => {
    switch (type){
        case 'setFormfieldValue':
            return { payload }  
        default:
            return state
    }
}

export default reducer