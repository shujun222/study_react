import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    // 并且我们希望 counterReducer 在 dispatch action 时更新 state.counter 部分。
    counter: counterReducer,
  },
});

export default store;