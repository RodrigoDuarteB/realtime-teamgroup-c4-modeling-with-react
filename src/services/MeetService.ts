import { store } from "../firebase.config"

export const meetsReference = () => store.collection('meets')

export const getMeet = (id: string) => meetsReference().doc(id)

export const getMeetChat = (id: string) => meetsReference().doc(id)
.collection('chat')

export const getUserMeets = (userId: string) => meetsReference().where('host_id', "==", userId)

export const getMeetUsersConnected = (meetId: string) => getMeet(meetId)
.collection('users_connected')

export const getDiagramNodes = (id: string) => getMeet(id)
.collection('nodes')

export const getDiagramLinks = (id: string) => getMeet(id)
.collection('links')