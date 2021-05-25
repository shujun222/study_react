import store from './store';

export const plusAction = data => ({type:"plus", data:data*1});
export const minusAction = data => ({type:"minus", data:data*1});

// 异步action
export const plusAsyncAction1 = (data, time) => {
    setTimeout(()=>{
        store.dispatch(plusAction(data))
    }, time);
};

export const plusAsyncAction2 = (data, time) => {
    return () => {
        setTimeout(()=>{
            store.dispatch(plusAction(data))
        }, time);
    }
};

export const plusAsyncAction3 = (data, time) => {
    setTimeout(()=>{
        store.dispatch(plusAction(data))
    }, time);
}