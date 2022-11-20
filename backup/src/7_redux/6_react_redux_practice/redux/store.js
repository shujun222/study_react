import {createStore, applyMiddleware} from 'redux'
import combineReducers from './reducers'

import thunk from 'redux-thunk'

/**
 * applyMiddleware(thunk)这么定义是为了支持容器组件中connect(a, b)()
 * b参数里面有异步action, 即把网络请求放到了action中去执行
 * 其实我觉得如果action只是用来定义好{type, data}, 把数据请求放到UI组件里，不是可以省略createStore(count)吗？
 */
// export default createStore(count)
export default createStore(combineReducers, applyMiddleware(thunk))