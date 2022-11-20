import React, { Component } from 'react'
import { minusAction, plusAction, plusAsyncAction1, 
    plusAsyncAction2 } from './counter_action'
import store from './store';

export default class Counter extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.setState({})
        })
    }

    plus = () => {
        const selectNum = this.selectNum.value
        store.dispatch(plusAction(selectNum))
    }
    
    plusWhenOdd = () => {
        let count = store.getState();
        if (count % 2 === 0) return;
        const selectNum = this.selectNum.value;
        store.dispatch(plusAction(selectNum))
    }

    minus = () => {
        const selectNum = this.selectNum.value;
        // const count = this.state.count - selectNum;
        // this.setState({count});
        store.dispatch(minusAction(selectNum))
    }
    
    addAsyn= () => {
        const selectNum = this.selectNum.value;

        // 不需要异步action，异步方法（延时，ajax）写在组件内
        // setTimeout(()=>{
        //     store.dispatch(plusAction(selectNum))
        // }, 2000);

        // 如果异步操作不想写在组件内，那么就新增一个异步action呗
        // 方式1：直接把函数抽象到action不就可以了嘛？
        // plusAsyncAction1(selectNum, 2000);
        // 方式2：大费周章，得传递给dispatch一个function
        store.dispatch(plusAsyncAction2(selectNum, 2000));
        // 方式3：和方式2一样，只是使用非柯里化原则
        // store.dispatch( () => plusAsyncAction1(selectNum, 2000));
    }

    render() {
        return (<>
            <h2>3. react完整板，action也有了，但是定义type的const文件还是被我省略了</h2>

            当前和为: {store.getState()} <br/>

            <select ref={e => this.selectNum = e} style={{width: '50px'}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            &nbsp;
            <button onClick={this.plus}>+</button>
            &nbsp;
            <button onClick={this.minus}>-</button>
            &nbsp;
            <button onClick={this.plusWhenOdd}>奇数时才加</button>
            &nbsp;
            <button onClick={this.addAsyn}>异步延时加</button>
        </>)
    }
}