
import React, { useState, useEffect } from "react"
import { configureStore } from '@reduxjs/toolkit'

function Operation() {
  // State: a counter value
  const [counter, setCounter] = useState(0)
  // 为啥非得手动订阅呢，否则还不自动更新了？既然用了store.getState(), 肯定是要更新注册的呀
  useEffect(_ => {
    console.log("useEffect");
    // 只为了让其刷新, counter可以不显示
    store.subscribe(_ => setCounter(store.getState()))

    // 这里应该赋初始值
    // setCounter(store.getState())
    console.log("counter", counter);
  }, [counter])


  // Action: 当事件发生后，触发状态更新的代码
  const increment = () => {
    store.dispatch({ type: 'counter/increment' })
    console.log(store.getState());
  }

  console.log(222);
  // View: UI 定义
  return (
    <div style={{ border: 'dashed red', width: '200px', marginBottom: '10px' }}>
      组件1:<br />
      Value1(from store): {store.getState()} <br />
      value2(from state): {counter}
      <button onClick={increment}>Increment</button>
    </div>
  )
}


function Display() {
  const [counter, setCounter] = useState(0)
  useEffect(() => store.subscribe(_ => setCounter(Math.random())), [counter]);

  return (
    <div style={{ border: 'dashed green', width: '200px' }}>
      组件2:<br />
      显示数据 {store.getState()}
    </div>
  )
}


export default function Father() {
  return <div style={{ border: 'dashed blue', width: '250px', height: '200px' }}>
    Father组件: <br /><br />
    <Operation />
    <Display />
  </div>
}



// 开始redux...
// 1. reducer: 把action集中起来, 根据不同的action.type, 变幻state的方法
function counterReducer(state = 0, action) {
  // 检查 reducer 是否关心这个 action
  if (action.type === 'counter/increment') {
    // 如果是，复制 `state`
    return state + 1
  }
  // 返回原来的 state 不变
  return state
}

// 2. 根据reducer方法, 创建store: 集中保存state的地方
/**
 * 
 * a. 创建方法本来是 createStore(counter_reducers), createStore(combineReducers, applyMiddleware(thunk))
 * 例如: src\7_redux\6_react_redux_sharedata\redux\store.js
 * 函数只接受一个reducer. 如果我们有多个state, 在combineReducers中拆分: combineReducers({counter: counter, person: person})
 * 但是现在已经 deprecated 了
 * 
 * b. 新方法: 
   export default configureStore({
      reducer: {
        posts: postsReducer,
        users: usersReducer,
        notifications: notificationsReducer,
      },
    })
 * 
 */

const store = configureStore({ reducer: counterReducer })
console.log(store.getState())

// 3.1 dispatch, 参数只能是action对象, 改变state的唯一方式: dispatch(action)
// 这种可能就是所谓的单一数据流了吧
store.dispatch({ type: 'counter/increment' })
console.log(store.getState())

// 3.2 还得有个action生成器, 为何多此一举呢, 非得搞出个方法来
/**
 * a. 难道action直接定义为对象不够灵活, 因为一般action中不会像我的实例这么简单, 会带上数据
 *    例如: const plusAction = data => ({type:"plus", data:data*1});
 *    
 * b. 新版本没有这个东西了: slice, action, actionCreator 三合一了, 棒呀
 * increment, decrement定义的是reducer, 同时会自己产生同名的actionCreator
 * 例如:  { type: 'counter/increment' }
 * 
 * 
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle',
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  },
  
});

export default counterSlice.reducer;
// 没定义action, 照样能生成
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

 */
const increment = () => {
  return {
    type: 'counter/increment'
  }
}
store.dispatch(increment())
console.log(store.getState())

