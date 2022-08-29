export default function counter (preState=0, action) {
    const {type, data} = action;
    switch (type) {
        case 'plus':
            return preState + data
        case 'minus':
            return preState - data
        default:
            return preState
    }
}
