import React, { Component } from 'react'
// 引入connect，用于连接UI组件与redux
import {connect} from 'react-redux'
import {plusAction, minusAction, plusAsyncAction} from './redux/counter_action'

class Counter extends Component {
    plus = () => {
        const selectNum = this.selectNum.value;
        this.props.plus(selectNum);
    }
    
    plusWhenOdd = () => {
        let count = this.props.count;
        if (count % 2 === 0) return;
        const selectNum = this.selectNum.value;
        this.props.plus(selectNum);
    }

    minus = () => {
        const selectNum = this.selectNum.value;
        this.props.minus(selectNum);
    }
    
    addAsyn= () => {
        const selectNum = this.selectNum.value;
        this.props.asyncPlus(selectNum, 2000);
    }

    render() {
        return (<>
            <h2>5. react-redux 优化简写； 可以compare with floader 4_counter_react_redux</h2>
            <p>
                1. mapDispatchToProps转为对象写法，react-redux也认，可能是它的升级版？<br />
                2. 无需store.subscribe监听，是容器组件就带这个光环 <br />
                3. 如果有多容器组件，也没必要每个都传递store，可以通过Provider包裹 <br />
                4. 容器组件，UI组件可以合二为一
            </p>

            当前和为: {this.props.count} <br/>

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


export default connect(
    state => ({ count: state }),
    {
        plus: plusAction,
        minus: minusAction,
        asyncPlus: plusAsyncAction
    }
)(Counter);