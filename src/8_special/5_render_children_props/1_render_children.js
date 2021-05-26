import React, { PureComponent, Component } from 'react'


export default class A extends Component {
    state = {}

    handleClick = () => {
        this.setState({})
    }
    
    render() {
        // 1. A extends Component; 所以会执行react的api，只要setState，就会重新render
        console.log("A render...");
        return (
            <div style={{border: '1px solid red', padding: '10px', width: '500px'}}>
                我是A组件<br/>
                <button onClick={this.handleClick}>点击</button>

                {/* 2.1 B extends PureComponent, 即重写了shouldComponentUpdate生命周期函数，所以props不变，是不会更新的啦 */}
                {/* <B /> 
                <B>xxxx, B的孩子们</B> */}

                {/* 2.2 然而这种写法，如果B组件内的children要重写render，B也会跟着重写render，
                因为B不render，没法执行到B函数的this.props.children这一句 */}
                {/* <B> <C /> </B> */}

                {/* 3. 函数式组件虽然简洁，但是效率上没PureComponent高了吧，必须得render */}
                <C>
                    <B />
                </C>
            </div>
        )
    }
}

class B extends PureComponent {
    render() {
        console.log("B render...");
        return (
            <div style={{border: '1px solid green', padding: '10px'}}>
                我是B组件 <br />
                这是我的孩子们：
                {this.props.children}
            </div>
        )
    }
}

function C (props) {
    console.log("C render...");
    return (
        <div style={{border: '1px solid blue', padding: '10px'}}>
             我是C组件 <br />
            这是我的孩子们：
            {props.children}
        </div>
    )
}

