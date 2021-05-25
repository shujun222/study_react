import React, { Component } from 'react'
import {connect} from 'react-redux'
import {plus, minus, plusAsync} from '../redux/actions/count'


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
    
    plusAsync = () => {
        const selectNum = this.selectNum.value;
        this.props.plusAsync(selectNum, 2000);
    }

    render() {
        const {persons, count} = this.props
        return (<>
            <h2>Counter组件，下方组件人数为：{persons.length}</h2>
            当前和为: {count} <br />

            <select ref={e => this.selectNum = e} style={{ width: '50px' }}>
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
            <button onClick={this.plusAsync}>异步延时加</button>
        </>)
    }
}


export default connect(
    state => ({
        persons: state.person,
        count: state.counter
    }),
    {plus, minus, plusAsync}
)(Counter)
