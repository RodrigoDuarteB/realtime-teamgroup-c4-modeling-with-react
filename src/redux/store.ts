import { createStore, combineReducers } from 'redux'
import emailReducer from './reducers/emailReducer' 

const reducer = combineReducers({
    emailReducer
})

const store = createStore(reducer)

export default store