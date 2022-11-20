/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

// 引入createStore，专门用于创建redux中最为核心的store对象
import {createStore, applyMiddleware} from 'redux'
// 引入为counter组件服务的reducer
import counter_reducers from './counter_reducers'
import thunk from 'redux-thunk'

// 要把异步actionCreator从ui组件中抽出去到action中，就得需要异步中间件applyMiddleware(thunk)
export default createStore(counter_reducers, applyMiddleware(thunk))

