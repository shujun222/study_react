import React, { Component } from 'react'
import store from './store'

export default class Counter extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.setState({})
        })
    }

    plus = () => {
        const selectNum = this.selectNum.value
        store.dispatch({ type: "plus", data: selectNum * 1 })
    }

    plusWhenOdd = () => {
        let count = store.getState();
        if (count % 2 === 0) return;
        const selectNum = this.selectNum.value;
        store.dispatch({ type: "plus", data: selectNum * 1 })
    }

    minus = () => {
        const selectNum = this.selectNum.value;
        // const count = this.state.count - selectNum;
        // this.setState({count});
        store.dispatch({ type: "minus", data: selectNum * 1 })
    }

    addAsyn = () => {
        const selectNum = this.selectNum.value;
        setTimeout(() => {
            store.dispatch({ type: "plus", data: selectNum * 1 })
        }, 2000);
    }

    render() {
        return (<>
            <h2>2. react精简版，不带action玩的</h2>
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


