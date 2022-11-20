import React, { Component } from 'react'

export default class Counter extends Component {
    state = {
        count: 0
    }

    plus = () => {
        const selectNum = this.selectNum.value;
        console.log(this.selectNum, " ", selectNum);
        const count = this.state.count + parseInt(selectNum);
        this.setState({count});
    }
    
    plusWhenOdd = () => {
        let count = this.state.count;
        if (count % 2 === 0) return;
        const selectNum = this.selectNum.value;
        count = count + parseInt(selectNum);
        this.setState({count});
    }

    minus = () => {
        const selectNum = this.selectNum.value;
        const count = this.state.count - selectNum;
        this.setState({count});
    }
    
    addAsyn= () => {
        const selectNum = this.selectNum.value;
        console.log(this.selectNum, " ", selectNum);
        setTimeout(()=>{
            const count = this.state.count + parseInt(selectNum);
            this.setState({count});
        }, 2000);
    }

    render() {
        return (<>
            <h2>1. 纯react版本：</h2>
            当前和为: {this.state.count} <br/>

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


