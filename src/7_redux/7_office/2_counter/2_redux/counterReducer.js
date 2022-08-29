
export default function counterReducers (preState=0, action) {
    const {type, data} = action;
    console.log(action);
    switch (type) {
        case 'increment':
            return preState + 1
        case 'decrement':
            return preState - 1
        case 'incrementByAmount':
            return preState + data
        case 'incrementIfOdd':
            // 逻辑写在reducer中？不写action里？
            if (preState % 2 === 1) {
                return preState + data
            } else {
                return preState
            }
        // 没有default分支，就没有初始值
        default:
            return preState  

    }
}

