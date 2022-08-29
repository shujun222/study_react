import {combineReducers, rootReducer} from 'redux'
import counter from './counter'
import person from './person'

export default combineReducers({counter, person})

// reducer counter， person实际伤是个function，return的是state哈
// export default combineReducers({counter: counter, person: person})

/**
 * reducer为啥要存在这个combine呢？
 * 1. 如果全部写在一个reducer里也可以，但是为了区分default initState,
 *    有的可能是return 0 ，有的return [], 那么得将（key, value)映射放到reducer的判断里面了
 *    代码可读性不好
 * 2. combineReducers({a: counter, b: person})
 *    counter是个回调函数，之后内容组件中定义 state => ({count: state.a})，在此执行了回调，获取了结果
 */