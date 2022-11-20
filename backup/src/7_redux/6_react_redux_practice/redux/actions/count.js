import store from '../store';

export const plus = data => ({type:"plus", data:data*1});
export const minus = data => ({type:"minus", data:data*1});

// 异步action
// 为什么要有异步action存在必要呢？
// setTimeout好比fetch，如果把异步请求放到ui组件中，等结果返回后再调用this.props.plusAsync不香吗？
export const plusAsync = (data, time) => {
    return () => {
        setTimeout(()=>{
            store.dispatch(plus(data))
        }, time);
    }
};

