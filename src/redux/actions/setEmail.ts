export const type = 'setEmail'

const setEmail = (email: any) => {
    return {
        type,
        payload: email,
    }
}

export default setEmail