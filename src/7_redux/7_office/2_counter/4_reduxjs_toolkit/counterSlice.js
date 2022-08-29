import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCount } from '../common/counterAPI'

// 异步方法1：createAsyncThunk + extraReducers
// 这两个参数没啥用？随便写的吗？
export const incrementAsync = createAsyncThunk(
    '', 
    amount => fetchCount(amount)
);

export const incrementAsync2 = createAsyncThunk(
    'counter/fetchCount', 
    async amount => await fetchCount(amount)
);

// 异步方法2：手写的actionCreator + reducer incrementByAmount
export const incrementAsync3 = (amount) => async (dispatch, getState) => {
    // 错误写法
    // let response = fetchCount(amount) // Promise
    // dispatch(incrementByAmount(response));

    // fetchCount(amount).then(data => {
    //     console.log("data", data);
    //     dispatch(incrementByAmount(data));
    // })
    
    let response = await fetchCount(amount)
    dispatch(incrementByAmount(response));
};

export const counterReducer = createSlice({
    name: 'counter',

    // 还一定得定义为对象？ 直接数值定义还不允许....
    // initialState: 0,

    initialState: {
        value: 0
    },

    reducers: {
        increment: state => {
            state.value += 1
        },

        decrement: state => {
            state.value -= 1
        },

        incrementByAmount: (state, data) => {
            state.value += data.payload
        },

        incrementIfOdd: (state, data) => {
            if (state.value % 2 === 1) {
                state.value += data.payload
            }
        },

    },

    // 这个东西难道是为了方便异步处理？这么神奇？
    extraReducers: build => {
        build.addCase(incrementAsync.pending, state => {
            // console.log("incrementAsync", incrementAsync.pending, incrementAsync.fulfilled);
        }).addCase(incrementAsync.fulfilled, (state, action) => {
            // 异步的promise到底是什么呢？结束之后能自动进这里？
            state.value += action.payload
        })
    }
})

export const { increment, decrement, incrementByAmount, incrementIfOdd } = counterReducer.actions;
export default counterReducer.reducer;


// 也可以手写actionCreator, 控制dispatch时机，不写在reducer中，这样就可以自己控制异步等逻辑了
export const incrementIfOdd2 = (amount) => (dispatch, getState) => {
    const currentValue = getState().counter.value;
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
};


