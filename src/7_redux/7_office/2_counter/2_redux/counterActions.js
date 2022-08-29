import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCount } from '../common/counterAPI'
import store from './store'

export const increment = data => ({ type: "increment" })
export const decrement = data => ({ type: "decrement" })
export const incrementByAmount = data => ({ type: "incrementByAmount", data })

// export const incrementIfOdd = data => ({ type: "incrementIfOdd", data })

// 在actionCreator里面返回不同的action, 比较难写
export const incrementIfOdd = data => {
    if (store.getState() % 2 === 1) {
        return { type: "incrementByAmount", data }
    }
    // Uncaught Error: Actions may not have an undefined "type" property. You may have misspelled an action type string constant.
    return {}
}

// 逻辑写在action中？不写reducer里？
export const incrementAsync = data => {
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
