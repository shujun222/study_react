import React, { Component } from 'react'
import {MyContext} from './Context'

export default class D extends Component {
    // static contextType = MyContext
    render() {
        console.log("mycontext", MyContext);
        return (
            <div style={{border: '1px solid gray', padding: '10px'}}>
                我是孙组件D, 接收到的props是 
                {this.context}
                    
            </div>
        );
    }
}