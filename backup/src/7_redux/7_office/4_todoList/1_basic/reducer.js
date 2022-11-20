import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

// 手写combineReducers
export function rootReducer0(state = {}, action) {
  // 返回一个新的根 state 对象
  return {
    // `state.todos` 的值是 todos reducer 返回的值
    todos: todosReducer(state.todos, action),
    // 对于这两个reducer，我们只传入它们的状态 slice
    filters: filtersReducer(state.filters, action)
  }
}

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
