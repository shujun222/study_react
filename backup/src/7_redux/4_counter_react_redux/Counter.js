import React, { Component } from 'react';

export default class Counter extends Component {
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
            <h2>4. react-react版本</h2>
            <p>
                react是不想让redux碰它的组件呀，但是奈何redux又特别火，所以搞了一个react-redux<br/>
                在react组件(UI组件)外面包裹一层容器组件，只由容器组件和redux通讯
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