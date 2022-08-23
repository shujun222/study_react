import store from './store';

export const plusAction = data => ({type:"plus", data: data*1});
export const minusAction = data => ({type:"minus", data: data*1});

// 异步action
export const plusAsyncAction = (data, time) => {
    return () => {
        setTimeout(()=>{
            store.dispatch(plusAction(data))
        }, time);
    }
};

