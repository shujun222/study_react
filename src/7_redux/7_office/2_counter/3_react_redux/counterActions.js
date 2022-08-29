import { fetchCount } from '../common/counterAPI'
import store from './store'

export const increment = data => ({ type: "increment" })
export const decrement = data => ({ type: "decrement" })
export const incrementByAmount = data => ({ type: "incrementByAmount", data })

export const incrementIfOdd = data => ({ type: "incrementIfOdd", data })

// 逻辑写在action中？不写reducer里？
export const incrementAsync = data => {
    // 能成功，但是此处先返回的undefine, 控制台会报错
    // fetchCount(data).then(response =>
    //     store.dispatch(incrementByAmount(response))
    // )

    // 为了对付异步action 
    // a. 中间件创建store：createStore(counterReducer, applyMiddleware(thunk))
    // b. actionCreator返回function类型，然后中间件会异步处理
    return () => {
        fetchCount(data).then(response =>
            store.dispatch(incrementByAmount(response))
        )
    }
}
