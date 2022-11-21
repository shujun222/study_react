import React, { Component } from 'react'
import D from './D'

//1. 全局创建好context, 这样所有人都能拿到
export const MyContext = React.createContext()
const {Provider, Consumer} = MyContext

export default class A extends Component {
    state = {name: 'messi'}
    render() {
        const {name} = this.state
        return (
            <div style={{border: '1px solid red', padding: '10px', width: '500px'}}>
                Context可以实现祖孙之间的嵌套传递<br />
                我是父组件A, 名字是{name}
                {/* 2. 第一季组件处要申明传递 */}
                <Provider value={name}>
                    <B />
                </Provider>
            </div>
        )
    }
}

function B(props) {
    console.log(props);
    return (
        <div style={{border: '1px solid green', padding: '10px'}}>
            我是子组件B, 接收到的props是{props.name}
            <C1 />    
            <C2 />
        </div>
    );
}

class C1 extends Component {
    //3.1 接收方法1，谁要呀？谁举手
    static contextType = MyContext
    render() {
        return (
            <div style={{border: '1px solid gray', padding: '10px'}}>
                我是孙组件C1, 接收到的props是 {this.context}

                <p /> 
                如果继续引用D，会报错，如果跨js引用context呢？
                <D />    
            </div>
        );
    }
}

class C2 extends Component {
    render() {
        return (
            <div style={{border: '1px solid gray', padding: '10px'}}>
                我是孙组件C2, 接收到的props是 
                {/* 接收方式2： */}
                <Consumer>
                    {value => value}
                </Consumer>
            </div>
        );
    }
}