import React, { Component } from 'react'
import CounterContainer from './CounterContainer'
import store from './redux/store'

export default class App extends Component {
    render() {
        /**
         * react-redux坑点：往外要连接store & 往内要连接UI组件，
         * 但是store在容器组件外层传递，ui组件却在容器组件内部通过connect(ui组件参数)(UI组件)传递
         * 
         * 可能是为了connect(mapStateToProps, mapDispatchToProps)回调mapStateToProps(state), mapDispatchToProps(dispatch) ,
         * 所以需要提前传入store, 否则报错：Could not find "store" in the context of "Connect(Counter)
         * */
        return <CounterContainer store={store} />
    }
}
