import React, { Component } from 'react'
import CounterContainer from './Counter'
import store from './redux/store'
import {Provider} from 'react-redux'


export default class App extends Component {
    render() {
        // 如果由多个容器组件呢，那么每个容器组件都要单独传递store，例如：
        // <>
        //   <CounterContainer store={store} />
        //   <CounterContainer1 store={store} />
        //   <CounterContainer2 store={store} />
        //   <CounterContainer3 store={store} />
        //   <CounterContainer4 store={store} />
        // </>
        
        return (
            <Provider store={store}> 
                <CounterContainer />
                {/* <CounterContainer2 />
                <CounterContainer3 />
                <CounterContainer4 /> */}
            </Provider>
        );
    }
}



