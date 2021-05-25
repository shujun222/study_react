// 引入Counter的UI组件
import CounterUI from './Counter';
// 引入connect，用于连接UI组件与redux
import {connect} from 'react-redux';
import {plusAction, minusAction, plusAsyncAction} from './redux/counter_action'

function mapStateToProps(state) {    
    // 既然容器组件最外层传入了store, 那么本文件中就不需要引入store了
    // 需要的数据，全部由react-redux回调来传递
    // return {count: store.getState()}
    return {count: state};
}

function mapDispatchToProps(dispatch) {
    return {
        // plus: data => store.dispatch(plusAction(data)),
        plus: data => dispatch(plusAction(data)),
        minus: data => dispatch(minusAction(data)),
        asyncPlus: (data, time) => dispatch(plusAsyncAction(data, time))
    }
}

/**
 * react-redux坑点2：
 * 
 * 如果设计成connect(CounterUI, mapStateToProps, mapDispatchToProps, ... )也比现在这样好理解吧？
 *  
 * 或者：？ (我这样其实也不好用)
 * class ConuterContainer {
 *    return <CounterUI props={} />
 * }
 * export default connect(ConuterContainer)
 * 
 * 现在connect(mapStateToProps, mapDispatchToProps)返回的是一个函数，
 * connect()()返回的是类
 * 
 */
export default connect(mapStateToProps, mapDispatchToProps)(CounterUI);

// export default connect(
//     state => ({ count: state }),
//     dispatch => (
//         {
//             plus: data => dispatch(plusAction(data)),
//             minus: data => dispatch(minusAction(data)),
//             asyncPlus: (data, time) => dispatch(plusAsyncAction(data, time))
//         }
//     ),
// )(CounterUI);
