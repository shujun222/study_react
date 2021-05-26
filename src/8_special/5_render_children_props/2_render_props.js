import React, { PureComponent, Component, useState } from 'react'


export default class A extends Component {
   
    render() {
        return (
            <div style={{border: '1px solid red', padding: '10px', width: '500px'}}>
                我是A组件<br/>
                
               {/* 给B组件传递C组件的参数, 这么写就不行啦 */}
                {/* <C> <B /> </C> */}

                <C render={value => <B name={value} />} />
                {/* <B render={value => <C name={value} />} /> */}

            </div>
        )
    }
}

class B extends PureComponent {
    state = {name: 'b'}
    render() {
        console.log("B render...");
        return (
            <div style={{border: '1px solid green', padding: '10px'}}>
                我是B组件, my name: {this.state.name} <br />
                接收到父亲传下来的name: {this.props.name} <p/>

                这是我的孩子们：
                {this.props.render && this.props.render(this.state.name)}
            </div>
        )
    }
}

function C (props) {
    const [name] = useState("c")
    return (
        <div style={{border: '1px solid blue', padding: '10px'}}>
            我是C组件, name: {name} <br />
            接收到父亲传下来的name: {props.name} <p/>

            这是我的孩子们：
            {/* {props.children} */}
            {props.render && props.render(name)}
        </div>
    )
}

