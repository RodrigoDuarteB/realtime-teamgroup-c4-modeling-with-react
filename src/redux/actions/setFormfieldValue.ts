export const type = 'setFormfieldValue'

const setFormfieldValue = (value: any) => {
    return {
        type,
        payload: value
    }
}

export default setFormfieldValue