import {createStore, applyMiddleware} from 'redux'
import posts from './features/posts/postsSlice'
import users from './features/users/usersReducer'
import {combineReducers} from 'redux'
import thunk from 'redux-thunk'


const combine = combineReducers({posts, users})
export default createStore(combine, applyMiddleware(thunk))